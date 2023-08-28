/*
  Warnings:

  - You are about to drop the column `category` on the `section` table. All the data in the column will be lost.
  - The primary key for the `toc_links` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "section" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "toc_links" DROP CONSTRAINT "toc_links_pkey",
ADD CONSTRAINT "toc_links_pkey" PRIMARY KEY ("name");
