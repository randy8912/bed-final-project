import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  try {
    console.log(`Attempting to delete property with id: ${id}`);
    const deletedProperty = await prisma.property.delete({
      where: { id },
    });
    console.log(`Property deleted:`, deletedProperty);
    return deletedProperty.id;
  } catch (error) {
    console.error(`Error deleting property with id ${id}:`, error.message);
    return null;
  }
};

export default deletePropertyById;
