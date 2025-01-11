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

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    // Log the incoming DELETE request details
    console.log("Incoming DELETE request:");
    console.log("Params:", req.params);
    console.log("Headers:", req.headers);
    console.log("Authorization Header:", req.headers.authorization);

    const { id } = req.params;

    // Log before attempting to delete the user
    console.log(`Attempting to delete user with id: ${id}`);

    // Call the deleteUserById function and log the result
    const user = await deleteUserById(id);

    // Check if user exists and log the result
    if (!user) {
      console.log(`User with id ${id} not found in database.`);
      throw new NotFoundError(`User with id ${id} not found`);
    }

    // Log the successful deletion
    console.log(`User with id ${id} successfully deleted from the database.`);
    res.status(200).json({ message: `User with id ${id} deleted` });
  } catch (error) {
    // Log the error details for better debugging
    console.error("Error occurred while attempting to delete user:");
    console.error("Error message:", error.message);
    console.error("Stack trace:", error.stack);

    next(error); // Pass the error to the next middleware
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
