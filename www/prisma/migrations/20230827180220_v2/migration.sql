/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_category_fkey";

-- DropTable
DROP TABLE "category";
