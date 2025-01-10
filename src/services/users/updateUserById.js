import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.update({
      where: { id },
      data: updatedUser,
    });
    return user.id;
  } catch (error) {
    return null; // Return null if no user is found
  }
};

export default updateUserById;
