import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  // Fetch user by username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return null; // Return null if the user doesn't exist
  }

  // Compare the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null; // Return null if the password is incorrect
  }

  // Generate a JWT token with an expiry
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  return token;
};

export default login;
