CREATE TABLE IF NOT EXISTS queries (
  id SERIAL PRIMARY KEY,
  case_type TEXT NOT NULL,
  case_number TEXT NOT NULL,
  filing_year INTEGER NOT NULL,
  raw_response JSONB,
  queried_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
