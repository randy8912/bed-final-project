import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();

  try {
    const deletedAmenity = await prisma.amenity.delete({
      where: { id },
    });
    return deletedAmenity.id;
  } catch (error) {
    return null;
  }
};

export default deleteAmenityById;
