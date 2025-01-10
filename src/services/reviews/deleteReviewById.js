import { PrismaClient } from "@prisma/client";

const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();
  try {
    const deletedReview = await prisma.review.delete({
      where: { id },
    });
    return deletedReview.id;
  } catch (error) {
    return null; // Return null if no review is found
  }
};

export default deleteReviewById;
