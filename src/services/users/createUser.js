import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    name,
    email,
    phoneNumber,
    profilePicture,
  };

  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;
