-- CreateTable
CREATE TABLE "professional" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "professionalService" (
    "id" SERIAL NOT NULL,
    "duration" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "professionalId" INTEGER NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professionalService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "protocol" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "professionalServiceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availability" (
    "id" SERIAL NOT NULL,
    "dayOfTheWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionalServiceAvailability" (
    "id" SERIAL NOT NULL,
    "professionalServiceId" INTEGER NOT NULL,
    "availabilityId" INTEGER NOT NULL,

    CONSTRAINT "professionalServiceAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_id_key" ON "service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "book_protocol_key" ON "book"("protocol");

-- CreateIndex
CREATE UNIQUE INDEX "professionalServiceAvailability_professionalServiceId_key" ON "professionalServiceAvailability"("professionalServiceId");

-- AddForeignKey
ALTER TABLE "professionalService" ADD CONSTRAINT "professionalService_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professionalService" ADD CONSTRAINT "professionalService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_professionalServiceId_fkey" FOREIGN KEY ("professionalServiceId") REFERENCES "professionalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professionalServiceAvailability" ADD CONSTRAINT "professionalServiceAvailability_professionalServiceId_fkey" FOREIGN KEY ("professionalServiceId") REFERENCES "professionalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professionalServiceAvailability" ADD CONSTRAINT "professionalServiceAvailability_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
