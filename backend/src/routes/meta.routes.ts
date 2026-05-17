import express from 'express';

import {
  syncCampaignInsights,
  getCampaignInsights,
  getAIInsights,
} from '../controllers/meta.controller';

const router = express.Router();

router.get('/sync', syncCampaignInsights);

router.get('/insights', getCampaignInsights);

router.get('/ai-insights', getAIInsights);

export default router;