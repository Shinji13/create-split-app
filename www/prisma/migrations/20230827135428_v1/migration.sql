-- CreateTable
CREATE TABLE "category" (
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_category_fkey" FOREIGN KEY ("category") REFERENCES "category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
