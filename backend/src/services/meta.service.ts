import axios from 'axios';

const ACCESS_TOKEN =
  process.env.META_ACCESS_TOKEN;

const ACCOUNT_ID =
  process.env.META_AD_ACCOUNT_ID;

export const fetchMetaCampaigns = async () => {

  try {

    const response = await axios.get(
      `https://graph.facebook.com/v19.0/${ACCOUNT_ID}/campaigns`,
      {
        params: {
          access_token: ACCESS_TOKEN,
          fields: 'id,name,status',
        },
      }
    );

    return response.data;

  } catch (error: any) {

    console.error(
      'META ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
};

export const fetchCampaignInsights = async (
  campaignId: string
) => {

  try {

    const response = await axios.get(
      `https://graph.facebook.com/v19.0/${campaignId}/insights`,
      {
        params: {
          access_token: ACCESS_TOKEN,
          fields:
            'impressions,clicks,spend,ctr,cpc,reach',
          date_preset: 'last_30d',
          level: 'campaign',
        },
      }
    );

    return response.data;

  } catch (error: any) {

    console.error(
      'INSIGHTS ERROR:',
      error.response?.data || error.message
    );

    throw error;
  }
};