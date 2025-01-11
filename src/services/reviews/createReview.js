import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const createReview = async (rating, comment, userId, propertyId) => {
  // Validate input
  if (!rating || !comment || !userId || !propertyId) {
    const error = new Error(
      "Rating, comment, user ID, and property ID are required."
    );
    error.statusCode = 400;
    throw error;
  }

  try {
    const newReview = {
      id: uuidv4(),
      rating,
      comment,
      userId,
      propertyId,
    };

    return await prisma.review.create({ data: newReview });
  } catch (error) {
    if (error.code === "P2003") {
      throw {
        statusCode: 400,
        message:
          "Foreign key constraint violation: Invalid user ID or property ID.",
      };
    }
    console.error("Error creating review:", error.message);
    throw { statusCode: 500, message: "Internal server error" };
  }
};

export default createReview;
