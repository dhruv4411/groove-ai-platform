import express from "express";

const router = express.Router();

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

    let answer = "";

    if (lowerQuestion.includes("ctr")) {
      answer =
        "Improve CTR by testing stronger ad creatives, clearer CTAs, and more targeted audience segments.";
    } else if (
      lowerQuestion.includes("spend")
    ) {
      answer =
        "Optimize spend by pausing low-performing ads and reallocating budget to better-performing campaigns.";
    } else if (
      lowerQuestion.includes("conversion")
    ) {
      answer =
        "Improve conversions by optimizing landing pages and running retargeting campaigns.";
    } else if (
      lowerQuestion.includes("cpc")
    ) {
      answer =
        "Reduce CPC by improving audience targeting and increasing ad relevance scores.";
    } else {
      answer =
        "Focus on audience targeting, creative optimization, and campaign testing to improve performance.";
    }

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
});

export default router;