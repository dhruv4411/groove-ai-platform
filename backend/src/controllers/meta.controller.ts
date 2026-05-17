import { Request, Response } from 'express';

import {
  fetchMetaCampaigns,
  fetchCampaignInsights,
} from '../services/meta.service';

export const syncCampaigns = async (
  req: Request,
  res: Response
) => {

  try {

    const campaignsResponse =
      await fetchMetaCampaigns();

    const campaigns =
      campaignsResponse.data || [];

    const campaignInsights = await Promise.all(
      campaigns.map(async (campaign: any) => {

        const insightsResponse =
          await fetchCampaignInsights(
            campaign.id
          );

        const insight =
          insightsResponse.data?.[0] || {};

        return {
          campaignId: campaign.id,
          campaignName: campaign.name,
          impressions: Number(
            insight.impressions || 0
          ),
          clicks: Number(
            insight.clicks || 0
          ),
          spend: Number(
            insight.spend || 0
          ),
          ctr: Number(
            insight.ctr || 0
          ),
          cpc: Number(
            insight.cpc || 0
          ),
          reach: Number(
            insight.reach || 0
          ),
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: campaignInsights,
    });

  } catch (error: any) {

    console.error(
      'FULL META ERROR:',
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to sync campaigns',
      error:
        error.response?.data ||
        error.message,
    });
  }
};