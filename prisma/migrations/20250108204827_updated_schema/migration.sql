/*
  Warnings:

  - You are about to drop the `_AmenityToProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `content` on the `Review` table. All the data in the column will be lost.
  - Added the required column `bookingStatus` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkinDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfGuests` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aboutMe` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathRoomCount` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedroomCount` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxGuestCount` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AmenityToProperty_B_index";

-- DropIndex
DROP INDEX "_AmenityToProperty_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AmenityToProperty";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_PropertyAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PropertyAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PropertyAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "checkinDate" DATETIME NOT NULL,
    "checkoutDate" DATETIME NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "totalPrice" REAL NOT NULL,
    "bookingStatus" TEXT NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("id", "propertyId", "userId") SELECT "id", "propertyId", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Host" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL
);
INSERT INTO "new_Host" ("id", "name") SELECT "id", "name" FROM "Host";
DROP TABLE "Host";
ALTER TABLE "new_Host" RENAME TO "Host";
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");
CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "pricePerNight" REAL NOT NULL,
    "bedroomCount" INTEGER NOT NULL,
    "bathRoomCount" INTEGER NOT NULL,
    "maxGuestCount" INTEGER NOT NULL,
    "hostId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "Property_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("hostId", "id", "location", "pricePerNight") SELECT "hostId", "id", "location", "pricePerNight" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("id", "propertyId", "rating", "userId") SELECT "id", "propertyId", "rating", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyAmenities_AB_unique" ON "_PropertyAmenities"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyAmenities_B_index" ON "_PropertyAmenities"("B");
