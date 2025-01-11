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

router.get("/", async (req, res, next) => {
  try {
    const filters = req.query;
    const hosts = await getHosts(filters);
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);
    if (!host) {
      throw new NotFoundError(`Host with id ${id} not found`);
    }
    res.json(host);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateRequiredFields(["username", "password"]),
  async (req, res, next) => {
    try {
      const host = await createHost(req.body);
      res.status(201).json(host);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHost = await updateHostById(id, req.body);
    if (!updatedHost) {
      throw new NotFoundError(`Host with id ${id} not found`);
    }
    res.status(200).json({ message: `Host with id ${id} updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    // Log the incoming request and parameters
    console.log("Incoming DELETE request for host:");
    console.log("Params:", req.params);
    console.log("Headers:", req.headers);

    const { id } = req.params;

    // Log before attempting to delete the host
    console.log(`Attempting to delete host with id: ${id}`);

    const result = await deleteHostById(id);

    // Check if host exists and log the outcome
    if (!result) {
      console.log(`Host with id ${id} not found.`);
      throw new NotFoundError(`Host with id ${id} not found`);
    }

    // Log success before sending response
    console.log(`Host with id ${id} successfully deleted.`);
    res.status(200).json({ message: `Host with id ${id} deleted` });
  } catch (error) {
    // Log error details
    console.error("Error occurred while deleting host:", error.message);
    console.error(error.stack);
    next(error);
  }
});

export default router;
