import { Request, Response } from 'express';

import { processChatQuery } from '../services/chat.service';

export const chatWithAI = async (
  req: Request,
  res: Response
) => {

  try {

    const { query } = req.body;

    const response = await processChatQuery(query);

    res.json({
      success: true,
      data: response,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Chat processing failed',
    });

  }

};