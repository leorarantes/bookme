/*
  Warnings:

  - You are about to drop the column `startTime` on the `availability` table. All the data in the column will be lost.
  - You are about to drop the column `professionalServiceId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `professionalService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professionalServiceAvailability` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `startHour` to the `availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMinute` to the `availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionId` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameId` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_professionalServiceId_fkey";

-- DropForeignKey
ALTER TABLE "professionalService" DROP CONSTRAINT "professionalService_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "professionalService" DROP CONSTRAINT "professionalService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "professionalServiceAvailability" DROP CONSTRAINT "professionalServiceAvailability_availabilityId_fkey";

-- DropForeignKey
ALTER TABLE "professionalServiceAvailability" DROP CONSTRAINT "professionalServiceAvailability_professionalServiceId_fkey";

-- DropIndex
DROP INDEX "service_name_key";

-- AlterTable
ALTER TABLE "availability" DROP COLUMN "startTime",
ADD COLUMN     "startHour" INTEGER NOT NULL,
ADD COLUMN     "startMinute" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "book" DROP COLUMN "professionalServiceId",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descriptionId" INTEGER NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "nameId" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "professionalId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "professionalService";

-- DropTable
DROP TABLE "professionalServiceAvailability";

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "serviceName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceDescription" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "serviceDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceAvailability" (
    "id" SERIAL NOT NULL,
    "serviceId" TEXT NOT NULL,
    "availabilityId" INTEGER NOT NULL,

    CONSTRAINT "serviceAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "serviceName_name_key" ON "serviceName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "serviceDescription_name_key" ON "serviceDescription"("name");

-- CreateIndex
CREATE UNIQUE INDEX "serviceAvailability_serviceId_key" ON "serviceAvailability"("serviceId");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "serviceName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "serviceDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAvailability" ADD CONSTRAINT "serviceAvailability_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceAvailability" ADD CONSTRAINT "serviceAvailability_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
