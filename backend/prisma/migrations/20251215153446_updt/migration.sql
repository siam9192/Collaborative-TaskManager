/*
  Warnings:

  - A unique constraint covering the columns `[socketId]` on the table `active_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordLastChangedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "active_sessions_socketId_key" ON "active_sessions"("socketId");
