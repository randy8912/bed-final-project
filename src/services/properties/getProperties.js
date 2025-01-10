import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (filters) => {
  const { location, pricePerNight } = filters;

  const query = {
    where: {},
    include: {
      reviews: true, // Include reviews as per assignment requirements
      bookings: true, // Include bookings as per assignment requirements
    },
  };

  // Filter by location
  if (location) {
    query.where.location = {
      contains: location, // Partial match for location
    };
  }

  // Filter by price per night
  if (pricePerNight) {
    query.where.pricePerNight = {
      lte: parseFloat(pricePerNight), // Prices less than or equal to the given value
    };
  }

  return prisma.property.findMany(query);
};

export default getProperties;
