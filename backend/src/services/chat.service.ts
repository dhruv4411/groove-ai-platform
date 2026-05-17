import { prisma } from '../db/prisma';

export const processChatQuery = async (
  query: string
) => {

  const lowerQuery = query.toLowerCase();

  const campaigns = await prisma.campaignInsight.findMany();

  // Best Campaign
  if (
    lowerQuery.includes('best') ||
    lowerQuery.includes('highest ctr')
  ) {

    const bestCampaign = campaigns.reduce(
      (prev, current) =>
        (prev.ctr ?? 0) > (current.ctr ?? 0)
          ? prev
          : current
    );

    return {
      answer: `The best performing campaign is ${bestCampaign.campaignName} with a CTR of ${bestCampaign.ctr}%.`,
    };
  }

  // Spend
  if (
    lowerQuery.includes('spend') ||
    lowerQuery.includes('budget')
  ) {

    const totalSpend = campaigns.reduce(
      (acc, curr) => acc + (curr.spend ?? 0),
      0
    );

    return {
      answer: `Total campaign spend is $${totalSpend.toFixed(2)}.`,
    };
  }

  // Clicks
  if (
    lowerQuery.includes('clicks')
  ) {

    const totalClicks = campaigns.reduce(
      (acc, curr) => acc + (curr.clicks ?? 0),
      0
    );

    return {
      answer: `Total campaign clicks are ${totalClicks}.`,
    };
  }

  return {
    answer:
      'I could not understand the query. Try asking about CTR, spend, or clicks.',
  };
};