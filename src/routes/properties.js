import { Router } from "express";
import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import getProperties from "../services/properties/getProperties.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middlewares/auth.js";
import { NotFoundError } from "../utils/customErrors.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const filters = req.query; // Extract query parameters
    const properties = await getProperties(filters);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    if (!property) {
      throw new NotFoundError(`Property with id ${id} not found`);
    }
    res.json(property);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const property = await createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProperty = await updatePropertyById(id, req.body);
    if (!updatedProperty) {
      throw new NotFoundError(`Property with id ${id} not found`);
    }
    res.status(200).json({ message: `Property with id ${id} updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deletePropertyById(id);
    if (!result) {
      throw new NotFoundError(`Property with id ${id} not found`);
    }
    res.status(200).json({ message: `Property with id ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
