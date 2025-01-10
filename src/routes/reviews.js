import { Router } from "express";
import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import getReviewById from "../services/reviews/getReviewById.js";
import getReviews from "../services/reviews/getReviews.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middlewares/auth.js";
import { NotFoundError } from "../utils/customErrors.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { rating, comment, userId, propertyId } = req.body;
    const review = await createReview({ rating, comment, userId, propertyId });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    if (!review) {
      throw new NotFoundError(`Review with id ${id} not found`);
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedReview = req.body;
    const result = await updateReviewById(id, updatedReview);
    if (!result) {
      throw new NotFoundError(`Review with id ${id} not found`);
    }
    res.status(200).json({ message: `Review with id ${id} updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteReviewById(id);
    if (!result) {
      throw new NotFoundError(`Review with id ${id} not found`);
    }
    res.status(200).json({ message: `Review with id ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
