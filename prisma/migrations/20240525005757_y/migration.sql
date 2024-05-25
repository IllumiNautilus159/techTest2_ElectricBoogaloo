-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Code" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "redeemed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "redeemedAt" DATETIME NOT NULL
);
INSERT INTO "new_Code" ("code", "createdAt", "id", "redeemed", "redeemedAt", "userId", "value") SELECT "code", "createdAt", "id", "redeemed", "redeemedAt", "userId", "value" FROM "Code";
DROP TABLE "Code";
ALTER TABLE "new_Code" RENAME TO "Code";
CREATE UNIQUE INDEX "Code_code_key" ON "Code"("code");
PRAGMA foreign_key_check("Code");
PRAGMA foreign_keys=ON;
