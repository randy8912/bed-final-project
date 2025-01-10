import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const createHost = async ({
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newHost = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  const prisma = new PrismaClient();
  const host = await prisma.host.create({
    data: newHost,
  });

  return host;
};

export default createHost;
