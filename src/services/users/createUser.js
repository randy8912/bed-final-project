import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  if (!username || !password || !email) {
    const error = new Error(
      "Username, password, and email are required fields."
    );
    error.statusCode = 400;
    throw error;
  }

  try {
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

    return await prisma.user.create({ data: newUser });
  } catch (error) {
    if (error.code === "P2002") {
      throw { statusCode: 400, message: "Username or email already exists." };
    }
    throw { statusCode: 500, message: "Internal server error" };
  }
};

export default createUser;
