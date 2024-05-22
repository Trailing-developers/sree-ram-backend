/*
  Warnings:

  - A unique constraint covering the columns `[position,type]` on the table `Widgets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Widgets_position_type_key" ON "Widgets"("position", "type");
