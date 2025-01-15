import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (filters) => {
  const { location, pricePerNight } = filters;

  const query = {
    where: {},
    include: {
      reviews: true,
      bookings: true,
    },
  };

  if (location) {
    query.where.location = { contains: location };
  }

  if (pricePerNight) {
    query.where.pricePerNight = { equals: parseFloat(pricePerNight) };
  }

  return prisma.property.findMany(query);
};

export default getProperties;
