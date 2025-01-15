import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (filters) => {
  const { name, username, email } = filters;

  const query = {
    where: {},
  };

  // Filter by name
  if (name) {
    query.where.name = {
      contains: name,
    };
  }

  // Filter by username
  if (username) {
    query.where.username = {
      contains: username,
    };
  }

  // Filter by email
  if (email) {
    query.where.email = {
      equals: email,
    };
  }

  return prisma.user.findMany(query);
};

export default getUsers;
