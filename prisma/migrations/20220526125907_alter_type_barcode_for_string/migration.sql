-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_popsicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taste" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barcode" TEXT,
    "productsId" TEXT NOT NULL,
    CONSTRAINT "popsicles_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_popsicles" ("barcode", "category", "cost", "id", "price", "productsId", "taste") SELECT "barcode", "category", "cost", "id", "price", "productsId", "taste" FROM "popsicles";
DROP TABLE "popsicles";
ALTER TABLE "new_popsicles" RENAME TO "popsicles";
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "barcode" TEXT
);
INSERT INTO "new_products" ("barcode", "cost", "id", "name", "price", "product") SELECT "barcode", "cost", "id", "name", "price", "product" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
