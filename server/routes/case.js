const express = require("express");
const router = express.Router();
const scrapeCaseData = require("../services/scraper");
const db = require("../db");

router.post("/", async (req, res) => {
  const { caseType, caseNumber, filingYear } = req.body;

  if (!caseType || !caseNumber || !filingYear) {
    return res.status(400).json({
      message: "Case Type, Case Number, and Filing Year are required.",
    });
  }

  try {
    const data = await scrapeCaseData(caseType, caseNumber, filingYear);

    // Log the query and raw response to the database
    await db.query(
      "INSERT INTO queries (case_type, case_number, filing_year, raw_response) VALUES ($1, $2, $3, $4)",
      [caseType, caseNumber, filingYear, data]
    );

    res.json(data);
  } catch (error) {
    console.error("Error in /case-status route:", error);
    res.status(500).json({
      message:
        error.message ||
        "Failed to fetch case data from the court portal. Please check the details or try again later.",
    });
  }
});

module.exports = router;
