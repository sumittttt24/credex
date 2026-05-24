-- StackAudit Database Schema
-- Run this in your Supabase SQL Editor

-- Audits table
CREATE TABLE IF NOT EXISTS audits (
  id TEXT PRIMARY KEY,
  input JSONB NOT NULL,
  results JSONB NOT NULL,
  ai_summary TEXT,
  total_monthly_savings NUMERIC DEFAULT 0,
  total_annual_savings NUMERIC DEFAULT 0,
  tools_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  audit_id TEXT REFERENCES audits(id),
  email TEXT NOT NULL,
  company_name TEXT,
  role TEXT,
  team_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Audits: public read, server insert
CREATE POLICY "Anyone can read audits" ON audits FOR SELECT USING (true);
CREATE POLICY "Service role can insert audits" ON audits FOR INSERT WITH CHECK (true);

-- Leads: server only
CREATE POLICY "Service role can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "No public read on leads" ON leads FOR SELECT USING (false);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audits_created_at ON audits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_audit_id ON leads(audit_id);
