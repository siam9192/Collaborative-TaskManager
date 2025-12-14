/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `oldStatus` on the `task_status_audit_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `newStatus` on the `task_status_audit_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserAccountStatus" AS ENUM ('Active', 'Blocked');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('To_Do', 'In_Progress', 'Review', 'Completed');

-- AlterTable
ALTER TABLE "task_status_audit_logs" DROP COLUMN "oldStatus",
ADD COLUMN     "oldStatus" "TaskStatus" NOT NULL,
DROP COLUMN "newStatus",
ADD COLUMN     "newStatus" "TaskStatus" NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "UserAccountStatus" NOT NULL DEFAULT 'Active',
ADD COLUMN     "username" VARCHAR(50) NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
