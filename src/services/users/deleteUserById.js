import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser.id;
  } catch (error) {
    return null; // Return null if no user is found
  }
};

export default deleteUserById;
