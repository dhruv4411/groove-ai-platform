import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const lowerQuestion = question.toLowerCase();

    // ====================================
    // DATABASE QUERY HANDLING
    // ====================================

    // Highest Spend Campaign
    if (
      lowerQuestion.includes("highest spend") ||
      lowerQuestion.includes("most spend") ||
      lowerQuestion.includes("highest campaign spend") ||
      lowerQuestion.includes("which campaign has highest spend")
    ) {
      const campaign =
        await prisma.campaignInsight.findFirst({
          orderBy: {
            spend: "desc",
          },
        });

      if (!campaign) {
        return res.json({
          success: true,
          answer: "No campaign data found.",
        });
      }

      return res.json({
        success: true,
        answer: `The highest spend campaign is ${campaign.campaignName} with a spend of $${campaign.spend}.`,
      });
    }

    // Highest CTR Campaign
    if (
      lowerQuestion.includes("highest ctr") ||
      lowerQuestion.includes("best ctr") ||
      lowerQuestion.includes("which campaign has highest ctr")
    ) {
      const campaign =
        await prisma.campaignInsight.findFirst({
          orderBy: {
            ctr: "desc",
          },
        });

      if (!campaign) {
        return res.json({
          success: true,
          answer: "No campaign data found.",
        });
      }

      return res.json({
        success: true,
        answer: `The campaign with the highest CTR is ${campaign.campaignName} with a CTR of ${campaign.ctr}%.`,
      });
    }

    // Highest Clicks Campaign
    if (
      lowerQuestion.includes("highest clicks") ||
      lowerQuestion.includes("most clicks") ||
      lowerQuestion.includes("which campaign has most clicks")
    ) {
      const campaign =
        await prisma.campaignInsight.findFirst({
          orderBy: {
            clicks: "desc",
          },
        });

      if (!campaign) {
        return res.json({
          success: true,
          answer: "No campaign data found.",
        });
      }

      return res.json({
        success: true,
        answer: `The campaign with the most clicks is ${campaign.campaignName} with ${campaign.clicks} clicks.`,
      });
    }

    // Total Campaign Count
    if (
      lowerQuestion.includes("how many campaigns") ||
      lowerQuestion.includes("total campaigns")
    ) {
      const totalCampaigns =
        await prisma.campaignInsight.count();

      return res.json({
        success: true,
        answer: `There are ${totalCampaigns} campaigns stored in the database.`,
      });
    }

    // ====================================
    // AI RECOMMENDATION SECTION
    // ====================================

    let answer = "";

    if (lowerQuestion.includes("ctr")) {
      answer =
        "Improve CTR by testing stronger ad creatives, clearer CTAs, and more targeted audience segments.";
    } else if (lowerQuestion.includes("spend")) {
      answer =
        "Optimize spend by pausing low-performing ads and reallocating budget to better-performing campaigns.";
    } else if (
      lowerQuestion.includes("conversion")
    ) {
      answer =
        "Improve conversions by optimizing landing pages and retargeting campaigns.";
    } else {
      answer =
        "Focus on audience segmentation, creative testing, and campaign optimization strategies.";
    }

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;