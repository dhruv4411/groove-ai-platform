interface CampaignData {
  campaignName: string;
  ctr: number | null;
  cpc: number | null;
  spend: number | null;
  clicks: number | null;
}

export const generateAIInsights = (
  campaign: CampaignData
) => {

  const insights: string[] = [];

  const ctr = campaign.ctr ?? 0;
  const cpc = campaign.cpc ?? 0;
  const spend = campaign.spend ?? 0;
  const clicks = campaign.clicks ?? 0;

  // CTR Analysis
  if (ctr >= 3) {
    insights.push(
      'Campaign CTR is performing strongly.'
    );
  } else {
    insights.push(
      'CTR is below expected benchmark.'
    );
  }

  // CPC Analysis
  if (cpc <= 0.2) {
    insights.push(
      'Cost per click is highly efficient.'
    );
  } else {
    insights.push(
      'CPC is increasing. Consider audience refinement.'
    );
  }

  // Spend Analysis
  if (spend > 800) {
    insights.push(
      'High budget utilization detected.'
    );
  }

  // Click Analysis
  if (clicks > 4000) {
    insights.push(
      'Campaign engagement is excellent.'
    );
  }

  return {
    campaignName: campaign.campaignName,
    insights,
  };
};