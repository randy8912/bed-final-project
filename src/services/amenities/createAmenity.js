import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createAmenity = async ({ name }) => {
  const newAmenity = {
    id: uuidv4(),
    name,
  };

  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.create({
    data: newAmenity,
  });

  return amenity;
};

export default createAmenity;
