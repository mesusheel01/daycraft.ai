/*
  Warnings:

  - You are about to drop the column `name` on the `task` table. All the data in the column will be lost.
  - Added the required column `task` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "name",
ADD COLUMN     "task" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tips" TEXT;
