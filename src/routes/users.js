import { Router } from "express";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import getUserById from "../services/users/getUserById.js";
import getUsers from "../services/users/getUsers.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middlewares/auth.js";
import { NotFoundError } from "../utils/customErrors.js";
import { validateRequiredFields } from "../middlewares/validationMiddleware.js";

const router = Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const users = await getUsers(req.query);
    // Exclude sensitive fields like password
    const filteredUsers = users.map(({ password, ...rest }) => rest);
    res.status(200).json(filteredUsers);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  auth,
  validateRequiredFields(["username", "password", "email"]),
  async (req, res, next) => {
    try {
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;

      const newUser = await createUser(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    // Exclude sensitive fields like password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    res.status(200).json({ message: `User with id ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const result = await updateUserById(id, updatedUser);
    if (!result) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    res.status(200).json({ message: `User with id ${id} updated` });
  } catch (error) {
    next(error);
  }
});

export default router;
