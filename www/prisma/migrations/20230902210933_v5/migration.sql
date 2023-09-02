/*
  Warnings:

  - The primary key for the `toc_links` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "toc_links" DROP CONSTRAINT "toc_links_pkey",
ADD CONSTRAINT "toc_links_pkey" PRIMARY KEY ("name", "sectionName");
