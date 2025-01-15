import { Router } from "express";
import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import getHostById from "../services/hosts/getHostById.js";
import getHosts from "../services/hosts/getHosts.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middlewares/auth.js";
import { NotFoundError } from "../utils/customErrors.js";
import { validateRequiredFields } from "../middlewares/validationMiddleware.js";

const router = Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const hosts = await getHosts(req.query);
    // Exclude sensitive fields like password
    const filteredHosts = hosts.map(({ password, ...rest }) => rest);
    res.status(200).json(filteredHosts);
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
      const host = await createHost(req.body);
      res.status(201).json(host);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);
    if (!host) {
      throw new NotFoundError(`Host with id ${id} not found`);
    }
    // Exclude sensitive fields like password
    const { password, ...hostWithoutPassword } = host;
    res.json(hostWithoutPassword);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteHostById(id);
    if (!result) {
      throw new NotFoundError(`Host with id ${id} not found`);
    }
    res.status(200).json({ message: `Host with id ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHost = req.body;
    const result = await updateHostById(id, updatedHost);
    if (!result) {
      throw new NotFoundError(`Host with id ${id} not found`);
    }
    res.status(200).json({ message: `Host with id ${id} updated` });
  } catch (error) {
    next(error);
  }
});

export default router;
