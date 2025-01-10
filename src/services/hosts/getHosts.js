import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosts = async (filters) => {
  const { name, username } = filters;

  const query = {
    where: {},
  };

  // Filter by name
  if (name) {
    query.where.name = {
      equals: name, // Ensure it matches exactly
    };
  }

  // Filter by username
  if (username) {
    query.where.username = {
      equals: username, // Ensure it matches exactly
    };
  }

  return prisma.host.findMany(query);
};

export default getHosts;
