import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();

  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: updatedBooking,
    });
    return booking.id;
  } catch (error) {
    return null; // Return null if no booking is found
  }
};

export default updateBookingById;
