import express from 'express';

import {
  syncCampaigns,
} from '../controllers/meta.controller';

const router = express.Router();

router.get('/sync', syncCampaigns);

export default router;