import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  try {
    const deletedHost = await prisma.host.delete({
      where: { id },
    });
    return deletedHost.id;
  } catch (error) {
    return null;
  }
};

export default deleteHostById;
