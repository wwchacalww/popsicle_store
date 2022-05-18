/*
  Warnings:

  - Added the required column `category` to the `popsicles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_popsicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taste" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barcode" BIGINT,
    "productsId" TEXT NOT NULL,
    CONSTRAINT "popsicles_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_popsicles" ("barcode", "cost", "id", "price", "productsId", "taste") SELECT "barcode", "cost", "id", "price", "productsId", "taste" FROM "popsicles";
DROP TABLE "popsicles";
ALTER TABLE "new_popsicles" RENAME TO "popsicles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
