/*
  Warnings:

  - You are about to drop the column `name` on the `serviceDescription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `professional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `serviceDescription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `serviceDescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "serviceDescription_name_key";

-- AlterTable
ALTER TABLE "serviceDescription" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "professional_name_key" ON "professional"("name");

-- CreateIndex
CREATE UNIQUE INDEX "serviceDescription_description_key" ON "serviceDescription"("description");
