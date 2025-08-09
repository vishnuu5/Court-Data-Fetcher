# Court-Data Fetcher & Mini-Dashboard

This project is a web application designed to fetch and display case metadata and the latest orders/judgments from the Indian eCourts portal.

**Court Targeted:** Delhi High Court (https://delhihighcourt.nic.in/)

## Functional Requirements Implemented:

1.  **UI**: A simple form built with React, Vite, JavaScript, and Tailwind CSS for inputting Case Type, Case Number, and Filing Year.
2.  **Backend**: An Express.js server that programmatically requests the court site, parses the necessary data, and handles the interaction with the database.
3.  **Storage**: Each query and its raw response are logged in a PostgreSQL database.
4.  **Display**: Parsed details are rendered nicely on the frontend, with options to download linked PDFs.
5.  **Error Handling**: User-friendly messages are displayed for invalid case numbers or site downtime.

### GitHub Link

**Clone GIt**

```bash
https://github.com/vishnuu5/Court-Data-Fetcher.git
```

**Video-Demo**

https://github.com/user-attachments/assets/69f5d45b-6f95-40fb-992e-12eafe656503

## Project Structure

```bash
.
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CaseDetails.jsx
│   │   │   └── CaseForm.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── case.js
│   │   ├── services/
│   │   │   └── scraper.js
│   │   ├── db/
│   │   │   └── index.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── scripts/                # Database initialization script
│   └── init-db.sql
└── README.md
```

## Setup and Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)
- PostgreSQL database

### 1. Database Setup

First, set up your PostgreSQL database.

sql file="scripts/init-db.sql"

```bash
CREATE TABLE IF NOT EXISTS queries (
  id SERIAL PRIMARY KEY,
  case_type TEXT NOT NULL,
  case_number TEXT NOT NULL,
  filing_year INTEGER NOT NULL,
  raw_response JSONB,
  queried_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

You can execute this SQL script using a PostgreSQL client (e.g., `psql`):

```bash
psql -U your_username -d your_database_name -f scripts/init-db.sql
```

### 2. Backend Setup

Navigate to the \`server/\` directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a \`.env\` file in the \`server/\` directory based on \`.env.example\`:

```bash
DATABASE_URL="postgresql://user:password@host:port/database"
PORT=3001
```

Replace the `DATABASE_URL` with your PostgreSQL connection string.

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:3001` (or the port you specified).

### 3. Frontend Setup

Navigate to the \`client/\` directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173` (or another available port).

## CAPTCHA Strategy

The eCourts portal often employs CAPTCHA to prevent automated scraping. Programmatically solving CAPTCHAs in real-time is a complex task and typically requires:

1.  **Manual Input**: The user manually enters the CAPTCHA text displayed in an image.
2.  **CAPTCHA Solving Services**: Integration with third-party services (e.g., 2Captcha, Anti-Captcha) that use human workers or AI to solve CAPTCHAs.
3.  **Machine Learning Models**: Training a custom ML model to recognize CAPTCHA patterns (highly complex and often unreliable due to CAPTCHA variations).

For this demonstration, the provided `scraper.js` assumes a simplified scenario where the CAPTCHA is either not present for the specific query path or a placeholder for manual input would be used in a real-world application. The current implementation focuses on navigating the site and parsing data _after_ any initial CAPTCHA challenge is conceptually handled. In a production environment, you would need to integrate one of the strategies above. For the purpose of this code, the Playwright script will attempt to proceed without explicit CAPTCHA solving. If the site blocks access due to CAPTCHA, the scraping will fail.

## Code Check

The code is structured to be clear and maintainable.

- **Security**: No hard-coded secrets. Environment variables are used for database connection.
- **Error Handling**: Basic error handling is implemented for network requests and database operations.
- **Robustness**: The Playwright scraper uses CSS selectors to target elements. While efforts are made to use robust selectors, changes in the court website's layout could break the scraping logic. Regular maintenance would be required for a production system.

## Demo Video

(Please imagine a screen-capture video here showing the following flow)

1.  **Starting the Servers**: Show terminal windows for both backend (`npm start`) and frontend (`npm run dev`) starting up.
2.  **Accessing the UI**: Open the browser to `http://localhost:5173`.
3.  **Form Interaction**:

- Select a "Case Type" (e.g., "CS" for Civil Suit).
- Enter a "Case Number" (e.g., a known valid case number from Delhi High Court, if available, or a placeholder for demonstration).
- Enter a "Filing Year".
- Click "Fetch Case Data".

4.  **Loading State**: Show a loading indicator while the backend fetches data.
5.  **Displaying Results**: Once data is fetched, display:

- Parties' Names (Petitioner, Respondent).
- Filing Date.
- Next Hearing Date.
- A link to download the most recent Order/Judgment PDF.

6.  **Error Scenario**: Demonstrate an invalid case number or a network error, showing the user-friendly error message.
7.  **Database Log**: Briefly show the PostgreSQL `queries` table content, demonstrating that the query and raw response were logged.

---
