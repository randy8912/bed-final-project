import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  try {
    console.log(`Attempting to delete host with id: ${id}`);
    const deletedHost = await prisma.host.delete({
      where: { id },
    });
    console.log(`Host deleted:`, deletedHost);
    return deletedHost.id;
  } catch (error) {
    console.error(`Error deleting host with id ${id}:`, error.message);
    return null;
  }
};

export default deleteHostById;
