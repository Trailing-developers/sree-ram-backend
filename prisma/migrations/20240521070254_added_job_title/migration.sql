-- CreateTable
CREATE TABLE "Widgets" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Widgets_pkey" PRIMARY KEY ("id")
);
