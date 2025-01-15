import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../utils/customErrors.js";

const router = Router();
const prisma = new PrismaClient();
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY || "my-secret-key";

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Check both users and hosts for login
    const account =
      (await prisma.user.findUnique({ where: { username } })) ||
      (await prisma.host.findUnique({ where: { username } }));

    if (!account) {
      throw new UnauthorizedError("Invalid username or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid username or password.");
    }

    const token = jwt.sign({ id: account.id }, AUTH_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      account: {
        id: account.id,
        username: account.username,
        type: account.email ? "user" : "host",
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
