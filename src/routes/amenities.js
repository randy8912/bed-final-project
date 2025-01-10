import { Router } from "express";
import createAmenity from "../services/amenities/createAmenity.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import getAmenities from "../services/amenities/getAmenities.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middlewares/auth.js";
import { NotFoundError } from "../utils/customErrors.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);
    if (!amenity) {
      throw new NotFoundError(`Amenity with id ${id} not found`);
    }
    res.json(amenity);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const amenity = await createAmenity(req.body);
    res.status(201).json(amenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAmenity = await updateAmenityById(id, req.body);
    if (!updatedAmenity) {
      throw new NotFoundError(`Amenity with id ${id} not found`);
    }
    res.status(200).json({ message: `Amenity with id ${id} updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAmenityById(id);
    if (!result) {
      throw new NotFoundError(`Amenity with id ${id} not found`);
    }
    res.status(200).json({ message: `Amenity with id ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
