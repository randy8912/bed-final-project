import { PrismaClient } from "@prisma/client";

const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();
  try {
    const deletedBooking = await prisma.booking.delete({
      where: { id },
    });
    return deletedBooking.id;
  } catch (error) {
    return null;
  }
};

export default deleteBookingById;
