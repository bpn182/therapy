import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// check if prisma instance exists in global object to prevent multiple instances of PrismaClient in development
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

prisma.user
  .findFirst()
  .then((user) => console.log("Connected to the database successfully."))
  .catch((error) => console.error("Failed to connect to the database:", error));

export default prisma;
