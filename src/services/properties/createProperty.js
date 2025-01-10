import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createProperty = async ({
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  hostId,
}) => {
  const newProperty = {
    id: uuidv4(),
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
    hostId,
  };

  const prisma = new PrismaClient();
  const property = await prisma.property.create({
    data: newProperty,
  });

  return property;
};

export default createProperty;
