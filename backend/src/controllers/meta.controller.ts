import { Request, Response } from 'express';

import { prisma } from '../db/prisma';

import { getMockCampaignInsights } from '../services/meta.service';

import { generateAIInsights } from '../services/ai.service';


// Sync mock campaign data into database
export const syncCampaignInsights = async (
  req: Request,
  res: Response
) => {
  try {

    const insights = await getMockCampaignInsights();

    for (const insight of insights) {

      await prisma.campaignInsight.create({
        data: insight,
      });

    }

    res.json({
      success: true,
      message: 'Campaign insights synced successfully',
      data: insights,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to sync insights',
    });

  }
};


// Fetch all campaign insights
export const getCampaignInsights = async (
  req: Request,
  res: Response
) => {
  try {

    const insights = await prisma.campaignInsight.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: insights,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch insights',
    });

  }
};


// Generate AI insights
export const getAIInsights = async (
  req: Request,
  res: Response
) => {
  try {

    const campaigns = await prisma.campaignInsight.findMany();

    const aiInsights = campaigns.map((campaign) =>
      generateAIInsights(campaign)
    );

    res.json({
      success: true,
      data: aiInsights,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to generate AI insights',
    });

  }
};