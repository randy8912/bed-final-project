import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const updateHostById = async (id, updatedHost) => {
  const prisma = new PrismaClient();

  if (updatedHost.password) {
    updatedHost.password = await bcrypt.hash(updatedHost.password, 10);
  }

  try {
    const host = await prisma.host.update({
      where: { id },
      data: updatedHost,
    });
    return host.id;
  } catch (error) {
    return null;
  }
};

export default updateHostById;
