-- CreateTable
CREATE TABLE "CampaignInsight" (
    "id" SERIAL NOT NULL,
    "campaignId" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "impressions" INTEGER,
    "clicks" INTEGER,
    "spend" DOUBLE PRECISION,
    "ctr" DOUBLE PRECISION,
    "cpc" DOUBLE PRECISION,
    "reach" INTEGER,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateStop" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignInsight_pkey" PRIMARY KEY ("id")
);
