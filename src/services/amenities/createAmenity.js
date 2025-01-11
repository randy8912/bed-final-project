import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const createAmenity = async ({ name }) => {
  // Validate input
  if (!name) {
    const error = new Error("Amenity name is required.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const newAmenity = {
      id: uuidv4(),
      name,
    };

    return await prisma.amenity.create({ data: newAmenity });
  } catch (error) {
    console.error("Error creating amenity:", error.message);
    throw { statusCode: 500, message: "Internal server error" };
  }
};

export default createAmenity;
