/*
  Warnings:

  - You are about to drop the `Mantra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Mantra";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isCityCenter" BOOLEAN NOT NULL,
    "isBusStation" BOOLEAN NOT NULL,
    "isTrainStation" BOOLEAN NOT NULL,
    "isAirport" BOOLEAN NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,
    "media" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "isVideo" BOOLEAN NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "templeId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temple" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "crowded" JSONB NOT NULL,
    "busyDays" JSONB NOT NULL,
    "darshanTimings" TEXT NOT NULL,
    "darshanTypes" JSONB NOT NULL,
    "information" JSONB NOT NULL,
    "history" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Temple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GodTempleMapping" (
    "templeId" INTEGER NOT NULL,
    "godId" INTEGER NOT NULL,

    CONSTRAINT "GodTempleMapping_pkey" PRIMARY KEY ("godId","templeId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "eventType" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Katha" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Katha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GodKathaMapping" (
    "godId" INTEGER NOT NULL,
    "kathaId" INTEGER NOT NULL,

    CONSTRAINT "GodKathaMapping_pkey" PRIMARY KEY ("godId","kathaId")
);

-- CreateTable
CREATE TABLE "MediaGodMapping" (
    "mediaId" INTEGER NOT NULL,
    "godId" INTEGER NOT NULL,

    CONSTRAINT "MediaGodMapping_pkey" PRIMARY KEY ("mediaId","godId")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temple" ADD CONSTRAINT "Temple_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GodTempleMapping" ADD CONSTRAINT "GodTempleMapping_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GodTempleMapping" ADD CONSTRAINT "GodTempleMapping_godId_fkey" FOREIGN KEY ("godId") REFERENCES "God"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GodKathaMapping" ADD CONSTRAINT "GodKathaMapping_godId_fkey" FOREIGN KEY ("godId") REFERENCES "God"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GodKathaMapping" ADD CONSTRAINT "GodKathaMapping_kathaId_fkey" FOREIGN KEY ("kathaId") REFERENCES "Katha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaGodMapping" ADD CONSTRAINT "MediaGodMapping_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaGodMapping" ADD CONSTRAINT "MediaGodMapping_godId_fkey" FOREIGN KEY ("godId") REFERENCES "God"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
