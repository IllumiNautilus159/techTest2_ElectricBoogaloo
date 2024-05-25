/*
  Warnings:

  - You are about to drop the `ScratchCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "ScratchCode_code_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ScratchCode";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Code" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "redeemed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "redeemedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);
INSERT INTO "new_Session" ("expires", "id", "sessionToken", "userId") SELECT "expires", "id", "sessionToken", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL
);
INSERT INTO "new_Post" ("createdAt", "createdById", "id", "name", "updatedAt") SELECT "createdAt", "createdById", "id", "name", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_name_idx" ON "Post"("name");
CREATE INDEX "Post_createdById_idx" ON "Post"("createdById");
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "client_id" TEXT
);
INSERT INTO "new_Account" ("access_token", "client_id", "expires_at", "id", "id_token", "provider", "providerAccountId", "refresh_token", "scope", "session_state", "token_type", "type", "userId") SELECT "access_token", "client_id", "expires_at", "id", "id_token", "provider", "providerAccountId", "refresh_token", "scope", "session_state", "token_type", "type", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE INDEX "Account_userId_idx" ON "Account"("userId");
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
PRAGMA foreign_key_check("Session");
PRAGMA foreign_key_check("Post");
PRAGMA foreign_key_check("Account");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Code_code_key" ON "Code"("code");
