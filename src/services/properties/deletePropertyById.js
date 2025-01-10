import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  try {
    const deletedProperty = await prisma.property.delete({
      where: { id },
    });
    return deletedProperty.id;
  } catch (error) {
    return null;
  }
};

export default deletePropertyById;
