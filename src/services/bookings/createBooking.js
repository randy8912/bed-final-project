import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const createBooking = async ({
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
  userId,
  propertyId,
}) => {
  // Validate input
  if (!checkinDate || !checkoutDate || !userId || !propertyId) {
    const error = new Error(
      "Check-in date, check-out date, user ID, and property ID are required."
    );
    error.statusCode = 400;
    throw error;
  }

  try {
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

    return await prisma.booking.create({ data: newBooking });
  } catch (error) {
    if (error.code === "P2003") {
      throw {
        statusCode: 400,
        message:
          "Foreign key constraint violation: Invalid user ID or property ID.",
      };
    }
    console.error("Error creating booking:", error.message);
    throw { statusCode: 500, message: "Internal server error" };
  }
};

export default createBooking;
