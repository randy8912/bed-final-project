import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, updatedData) => {
  const prisma = new PrismaClient();

  try {
    const updatedAmenity = await prisma.amenity.update({
      where: { id },
      data: updatedData,
    });
    return updatedAmenity.id;
  } catch (error) {
    return null;
  }
};

export default updateAmenityById;
