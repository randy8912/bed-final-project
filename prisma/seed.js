import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function loadData(fileName) {
  const data = await fs.readFile(
    path.resolve(`prisma/seedData/${fileName}`),
    "utf-8"
  );
  return JSON.parse(data);
}

async function main() {
  // Load data files
  const users = await loadData("users.json");
  const hosts = await loadData("hosts.json");
  const properties = await loadData("properties.json");
  const amenities = await loadData("amenities.json");
  const bookings = await loadData("bookings.json");
  const reviews = await loadData("reviews.json");

  // Seed Users
  console.log("Seeding users...");
  for (const user of users.users) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
    await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
  }

  // Seed Hosts
  console.log("Seeding hosts...");
  for (const host of hosts.hosts) {
    const hashedPassword = await bcrypt.hash(host.password, 10); // Hash the password
    await prisma.host.create({
      data: { ...host, password: hashedPassword },
    });
  }

  // Seed Amenities
  console.log("Seeding amenities...");
  for (const amenity of amenities.amenities) {
    await prisma.amenity.create({
      data: { ...amenity },
    });
  }

  // Seed Properties
  console.log("Seeding properties...");
  for (const property of properties.properties) {
    const {
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    } = property;

    await prisma.property.create({
      data: {
        id,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        host: {
          connect: { id: hostId },
        },
      },
    });
  }

  // Seed Bookings
  console.log("Seeding bookings...");
  for (const booking of bookings.bookings) {
    const {
      id,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
      userId,
      propertyId,
    } = booking;

    await prisma.booking.create({
      data: {
        id,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
        user: {
          connect: { id: userId },
        },
        property: {
          connect: { id: propertyId },
        },
      },
    });
  }

  // Seed Reviews
  console.log("Seeding reviews...");
  for (const review of reviews.reviews) {
    const { id, rating, comment, userId, propertyId } = review;

    await prisma.review.create({
      data: {
        id,
        rating,
        comment,
        user: {
          connect: { id: userId },
        },
        property: {
          connect: { id: propertyId },
        },
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
