# Groove AI Platform

AI-powered Meta Ads analytics dashboard with real-time campaign insights, AI recommendations, interactive analytics, and full-stack cloud deployment.

---

# Live Demo

## Frontend Deployment
🔗 https://groove-ai-platform.vercel.app/

## Backend Deployment
🔗 https://groove-ai-platform.onrender.com

---

# Features

- Meta Ads campaign synchronization
- AI-powered campaign assistant
- Interactive analytics dashboard
- Campaign filtering and search
- Recharts visual analytics
- Dark / Light mode toggle
- Responsive modern UI
- Real-time campaign performance tracking
- Gemini AI integration
- Prisma ORM backend architecture
- Cloud deployment using Vercel & Render

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Recharts
- CSS3

## Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM

## APIs
- Meta Marketing API
- Gemini AI API

## Deployment
- Vercel
- Render

---

# Project Screenshots

## Dashboard Overview

![Dashboard](./screenshots/dashboard-overview.png)

---

## Campaign Analytics

![Analytics](./screenshots/campaign-analytics.png)

---

## AI Campaign Assistant

![AI Assistant](./screenshots/ai-assistant.png)

---

# Folder Structure

```bash
groove-ai-platform/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── screenshots/
│   ├── dashboard-overview.png
│   ├── campaign-analytics.png
│   └── ai-assistant.png
│
└── README.md
```

---

# Environment Variables

## Backend `.env`

```env
META_ACCESS_TOKEN=your_meta_access_token
META_AD_ACCOUNT_ID=your_ad_account_id

GEMINI_API_KEY=your_gemini_api_key

PORT=3000
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/dhruv4411/groove-ai-platform.git
```

---

# Backend Setup

```bash
cd backend

npm install
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

---

# Running the Project

## Start Backend

```bash
cd backend

npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

## Start Frontend

```bash
cd frontend

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Routes

## Sync Campaigns

```http
GET /api/meta/sync
```

---

## AI Campaign Assistant

```http
POST /api/chat
```

### Request Body

```json
{
  "question": "How can I improve CTR?"
}
```

---

# Dashboard Modules

## Campaign Analytics
- Total Spend Tracking
- Click Monitoring
- Reach Analytics
- Impression Analysis
- Campaign Performance Visualization

---

## AI Campaign Assistant
The AI assistant provides:
- CTR optimization suggestions
- Audience targeting recommendations
- Creative improvement ideas
- Campaign optimization insights
- Marketing performance guidance

---

## Analytics Charts
Implemented using Recharts:
- Campaign spend comparison
- Interactive bar charts
- Campaign performance visualizations

---

# Deployment Architecture

```text
Frontend (React + Vercel)
        ↓
Backend API (Express + Render)
        ↓
Meta Ads API + Gemini AI
        ↓
Supabase PostgreSQL
```

---

# Prompt Engineering

The AI assistant uses structured prompts to ensure consistent and relevant campaign recommendations.

## System Prompt Strategy

The backend AI route uses a system prompt similar to:

```text
You are an AI marketing assistant for Meta Ads campaigns.
Provide concise, practical, and actionable campaign optimization advice.
Focus on CTR, CPC, audience targeting, creatives, and campaign scaling.
```

## Why This Helps

The system prompt:
- keeps responses marketing-focused
- prevents unrelated outputs
- improves consistency
- ensures concise recommendations
- reduces hallucinated responses

---

# Security Considerations

## SQL Injection Risks

Allowing an LLM to directly generate database queries can introduce SQL Injection risks if user input is not validated.

Example Risk:

```sql
DROP TABLE campaigns;
```

If executed directly, malicious queries could:
- delete database records
- expose sensitive data
- corrupt analytics systems

---

## Mitigation Strategies

### 1. Parameterized Queries
Use Prisma ORM and parameterized database operations instead of raw SQL.

### 2. Input Validation
Validate and sanitize all user inputs before processing.

### 3. Restricted Query Access
Never allow the AI model to directly execute arbitrary SQL queries.

### 4. Read-Only Permissions
Use restricted database roles with limited permissions.

### 5. Backend Authorization Layer
All AI requests pass through backend validation before accessing data.

---

# Scaling Strategy

## Problem

Large-scale databases with millions of campaign rows cannot be fully passed into the LLM prompt context due to:
- token limitations
- latency issues
- high inference cost

---

# Scalable Architecture Approach

## 1. Retrieval-Based Querying

Instead of sending all records:
- fetch only relevant campaign subsets
- use filters and aggregation queries
- provide summarized analytics to the model

Example:
- top performing campaigns
- campaigns with low CTR
- highest spend campaigns

---

## 2. Pre-Aggregated Analytics

Store summarized metrics such as:
- average CTR
- total spend
- top campaigns
- CPC trends

This reduces prompt size significantly.

---

## 3. Vector Search / RAG

For enterprise-scale systems:
- use embeddings
- vector databases
- Retrieval-Augmented Generation (RAG)

This allows semantic retrieval of only relevant records.

---

## 4. Pagination & Windowing

Load campaign data in chunks rather than full-table scans.

---

## 5. Background Processing

Heavy analytics workloads can be processed asynchronously using:
- queues
- cron jobs
- worker services

---

# Future Improvements

- User authentication
- Real-time Meta Ads updates
- PDF report export
- Multi-account support
- Advanced AI campaign forecasting
- Performance trend analysis
- Campaign automation workflows

---

# Author

Dhruv Gupta

Delhi Technological University (DTU)

---

# GitHub Repository

🔗 https://github.com/dhruv4411/groove-ai-platform

---

# License

MIT License