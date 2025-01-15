import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createHost = async ({
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe,
}) => {
  // Validate input
  if (!username || !password || !email) {
    const error = new Error("Username, password, and email are required.");
    error.statusCode = 400;
    throw error;
  }

  try {
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

    return await prisma.host.create({ data: newHost });
  } catch (error) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation
      throw {
        statusCode: 400,
        message: "Username or email already exists.",
      };
    }
    console.error("Error creating host:", error.message);
    throw { statusCode: 500, message: "Internal server error" };
  }
};

export default createHost;
