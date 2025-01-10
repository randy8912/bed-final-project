import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createReview = async (rating, comment, userId, propertyId) => {
  const newReview = {
    id: uuidv4(),
    rating,
    comment,
    userId,
    propertyId,
  };

  const prisma = new PrismaClient();
  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;
