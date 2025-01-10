import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();
  try {
    const property = await prisma.property.update({
      where: { id },
      data: updatedProperty,
    });
    return property.id;
  } catch (error) {
    return null;
  }
};

export default updatePropertyById;
