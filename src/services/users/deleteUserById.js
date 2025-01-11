import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  try {
    console.log(`Attempting to delete user with id: ${id}`);
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    console.log(`User deleted:`, deletedUser);
    return deletedUser.id;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error.message);
    return null;
  }
};

export default deleteUserById;
