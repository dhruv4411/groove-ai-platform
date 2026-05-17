export const getMockCampaignInsights = async () => {
  return [
    {
      campaignId: 'cmp_001',
      campaignName: 'Summer Sale Campaign',

      impressions: 120000,
      clicks: 4200,
      spend: 850.5,

      ctr: 3.5,
      cpc: 0.2,

      reach: 90000,

      dateStart: new Date('2025-05-01'),
      dateStop: new Date('2025-05-15'),
    },

    {
      campaignId: 'cmp_002',
      campaignName: 'Retargeting Campaign',

      impressions: 95000,
      clicks: 3100,
      spend: 640.75,

      ctr: 3.2,
      cpc: 0.21,

      reach: 70000,

      dateStart: new Date('2025-05-05'),
      dateStop: new Date('2025-05-20'),
    },
  ];
};