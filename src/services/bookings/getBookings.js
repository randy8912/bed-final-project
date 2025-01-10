import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (filters) => {
  const { userId } = filters;

  const query = {
    where: {},
    include: {
      property: true,
    },
  };

  // Filter by userId
  if (userId) {
    query.where.userId = userId;
  }

  return prisma.booking.findMany(query);
};

export default getBookings;
