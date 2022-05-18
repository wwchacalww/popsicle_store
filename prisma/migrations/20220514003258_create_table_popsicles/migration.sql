/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Products";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barcode" BIGINT
);

-- CreateTable
CREATE TABLE "popsicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taste" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barcode" BIGINT,
    "productsId" TEXT NOT NULL,
    CONSTRAINT "popsicles_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
