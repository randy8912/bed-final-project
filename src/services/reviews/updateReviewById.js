import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();
  try {
    const review = await prisma.review.update({
      where: { id },
      data: updatedReview,
    });
    return review.id;
  } catch (error) {
    return null;
  }
};

export default updateReviewById;
