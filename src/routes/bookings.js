import { Router } from "express";
import createBooking from "../services/bookings/createBooking.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import getBookingById from "../services/bookings/getBookingById.js";
import getBookings from "../services/bookings/getBookings.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middlewares/auth.js";
import { NotFoundError } from "../utils/customErrors.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const filters = req.query;
    const bookings = await getBookings(filters);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);
    if (!booking) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }
    res.json(booking);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBooking = await updateBookingById(id, req.body);
    if (!updatedBooking) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }
    res.status(200).json({ message: `Booking with id ${id} updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteBookingById(id);
    if (!result) {
      throw new NotFoundError(`Booking with id ${id} not found`);
    }
    res.status(200).json({ message: `Booking with id ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
