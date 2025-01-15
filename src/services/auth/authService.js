import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const findAccount = async (username) => {
  const user = await prisma.user.findUnique({ where: { username } });
  const host = await prisma.host.findUnique({ where: { username } });

  return user || host;
};

export const validatePassword = async (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};
