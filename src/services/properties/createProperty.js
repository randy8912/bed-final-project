import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

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
  // Validate input
  if (!title || !description || !pricePerNight || !hostId) {
    const error = new Error(
      "Title, description, price per night, and host ID are required."
    );
    error.statusCode = 400;
    throw error;
  }

  try {
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

    return await prisma.property.create({ data: newProperty });
  } catch (error) {
    if (error.code === "P2003") {
      throw {
        statusCode: 400,
        message: "Foreign key constraint violation: Invalid host ID.",
      };
    }
    console.error("Error creating property:", error.message);
    throw { statusCode: 500, message: "Internal server error" };
  }
};

export default createProperty;
