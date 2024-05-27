/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `God` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "God_name_key" ON "God"("name");
