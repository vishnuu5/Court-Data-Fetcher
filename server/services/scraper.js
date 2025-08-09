const { chromium } = require("playwright");
const readline = require("readline");

function prompt(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function scrapeCaseData(caseType, caseNumber, filingYear) {
  let browser;
  try {
    browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const delhiHighCourtUrl =
      "https://delhihighcourt.nic.in/app/get-case-type-status";
    await page.goto(delhiHighCourtUrl, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    console.log("Navigated to Delhi High Court.");
    await page.waitForTimeout(1000);

    // --- Step 2: Fill the form fields with precise ID selectors ---

    // Select Case Type
    try {
      // Use the exact ID from the HTML: id="case_type"
      await page.selectOption("#case_type", caseType);
      console.log(`Selected Case Type: ${caseType}`);
    } catch (e) {
      console.error(
        `Failed to select case type dropdown with value "${caseType}". Ensure this value exists in the dropdown's options and the dropdown is interactable.`,
        e
      );
      throw new Error(
        `Failed to select case type dropdown with value "${caseType}".`
      );
    }

    // Enter Case Number - Using the exact ID from the HTML: id="case_number"
    try {
      await page.fill("#case_number", caseNumber);
      console.log(`Filled Case Number: ${caseNumber}`);
    } catch (e) {
      console.error(
        "Failed to fill case number. Ensure the input field has ID 'case_number' and is visible/interactable.",
        e
      );
      throw new Error("Failed to fill case number input.");
    }

    // Enter Filing Year - Using the exact ID from the HTML: id="case_year"
    try {
      await page.selectOption("#case_year", filingYear);
      console.log(`Selected Filing Year: ${filingYear}`);
    } catch (e) {
      console.error(
        `Failed to select filing year dropdown with value "${filingYear}". Ensure this value exists in the dropdown's options and the dropdown is interactable.`,
        e
      );
      throw new Error(
        `Failed to select filing year dropdown with value "${filingYear}".`
      );
    }

    // --- CAPTCHA Handling (Automated) ---
    // Read the CAPTCHA value directly from the span element
    let captchaValue;
    try {
      await page.waitForSelector("#captcha-code", {
        state: "visible",
        timeout: 10000,
      });
      captchaValue = await page.textContent("#captcha-code");
      console.log(`Automatically read CAPTCHA: ${captchaValue}`);
    } catch (e) {
      console.error(
        "Failed to read CAPTCHA from #captcha-code span. It might not be visible or its ID changed.",
        e
      );
      throw new Error("Failed to read CAPTCHA automatically.");
    }

    // Fill the CAPTCHA input field
    try {
      await page.fill("#captchaInput", captchaValue); // Use the exact ID from HTML: id="captchaInput"
      console.log(`Filled CAPTCHA input with: ${captchaValue}`);
    } catch (e) {
      console.error(
        "Failed to fill CAPTCHA input field. Check its ID or if it's interactable.",
        e
      );
      throw new Error("Failed to fill CAPTCHA input.");
    }

    // Click the submit button - Using the exact ID from the HTML: id="search"
    try {
      await page.click("button#search");
      console.log("Clicked submit button.");
    } catch (e) {
      console.error(
        "Failed to click submit button. Check button ID 'search' or if it's interactable.",
        e
      );
      throw new Error("Failed to click submit button.");
    }

    // Wait for the results table to load or for a "No data" message
    // The table has id="caseTable" and its content is loaded via AJAX
    try {
      await page.waitForSelector("#caseTable tbody tr", { timeout: 15000 }); // Wait for at least one row in the table body
      console.log("Results table content loaded.");
    } catch (e) {
      console.warn(
        "Timeout waiting for results table rows. Checking for 'No data available' message."
      );
      const noDataMessage = await page
        .locator("text=No data available in table")
        .isVisible();
      if (noDataMessage) {
        console.log("No data available in table message detected.");
        return {
          message: "No case found for the provided details.",
          petitioner: null,
          respondent: null,
          filingDate: null,
          nextHearingDate: null,
          latestOrderPdf: null,
        };
      } else {
        console.error(
          "Failed to load results table and no 'No data' message found.",
          e
        );
        throw new Error("Failed to load case details after submission.");
      }
    }

    // --- Step 3: Parse the results ---
    const caseDetails = {};

    // These selectors are still tentative and will need precise inspection of the results table HTML
    // after a successful search. You'll need to find the specific cells/elements containing this data.
    try {
      // Example: Assuming Petitioner/Respondent are in specific cells of the first result row
      // This will likely need adjustment based on the actual table structure.
      caseDetails.petitioner = await page
        .locator("#caseTable tbody tr:first-child td:nth-child(3)") // Assuming 3rd column for Petitioner Vs. Respondent
        .textContent()
        .catch(() => null);
      // You might need to split the above text content into petitioner and respondent
      caseDetails.respondent = null; // Placeholder, needs actual parsing logic

      console.log("Extracted Petitioner/Respondent (tentative).");
    } catch (e) {
      console.warn(
        "Failed to extract Petitioner/Respondent. Check selectors for results table.",
        e
      );
    }

    try {
      // Example: Assuming Filing Date is in a specific cell
      caseDetails.filingDate = await page
        .locator('td:has-text("Filing Date") + td') // This selector might not work on results table
        .textContent()
        .catch(() => null);
      console.log("Extracted Filing Date (tentative).");
    } catch (e) {
      console.warn(
        "Failed to extract Filing Date. Check selectors for results table.",
        e
      );
    }

    try {
      // Example: Assuming Next Hearing Date is in a specific cell
      caseDetails.nextHearingDate = await page
        .locator('td:has-text("Next Hearing Date") + td') // This selector might not work on results table
        .textContent()
        .catch(() => null);
      console.log("Extracted Next Hearing Date (tentative).");
    } catch (e) {
      console.warn(
        "Failed to extract Next Hearing Date. Check selectors for results table.",
        e
      );
    }

    try {
      // Example: Extract latest order/judgment PDF link
      // This will require finding the link within the relevant row/column of the results table.
      const pdfLinkElement = await page
        .locator('a:has-text("View Document")')
        .last();
      caseDetails.latestOrderPdf = await pdfLinkElement
        .getAttribute("href")
        .catch(() => null);

      if (
        caseDetails.latestOrderPdf &&
        !caseDetails.latestOrderPdf.startsWith("http")
      ) {
        caseDetails.latestOrderPdf = new URL(
          caseDetails.latestOrderPdf,
          delhiHighCourtUrl
        ).href;
      }
      console.log("Extracted Latest Order PDF (tentative).");
    } catch (e) {
      console.warn(
        "Failed to extract Latest Order PDF. Check selectors for results table.",
        e
      );
    }

    return caseDetails;
  } catch (error) {
    console.error("Scraping failed:", error);
    throw new Error(
      `Failed to scrape data: ${error.message}. This might be due to site layout changes or CAPTCHA.`
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeCaseData;
