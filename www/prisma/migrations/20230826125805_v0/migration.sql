-- CreateTable
CREATE TABLE "section" (
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "toc_links" (
    "name" TEXT NOT NULL,
    "sectionName" TEXT NOT NULL,
    "order" SMALLINT NOT NULL,
    "degree" SMALLINT NOT NULL,

    CONSTRAINT "toc_links_pkey" PRIMARY KEY ("name","sectionName")
);

-- AddForeignKey
ALTER TABLE "toc_links" ADD CONSTRAINT "toc_links_sectionName_fkey" FOREIGN KEY ("sectionName") REFERENCES "section"("name") ON DELETE CASCADE ON UPDATE CASCADE;
