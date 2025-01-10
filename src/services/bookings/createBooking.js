import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createBooking = async ({
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
  userId,
  propertyId,
}) => {
  const newBooking = {
    id: uuidv4(),
    checkinDate: new Date(checkinDate),
    checkoutDate: new Date(checkoutDate),
    numberOfGuests,
    totalPrice,
    bookingStatus,
    userId,
    propertyId,
  };

  const prisma = new PrismaClient();
  const booking = await prisma.booking.create({
    data: newBooking,
  });

  return booking;
};

export default createBooking;
