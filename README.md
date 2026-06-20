# MistakeMind AI 🚀

## AI-Powered Coding Mistake Learning Platform

MistakeMind AI is an intelligent learning platform designed to help programmers track, analyze, and learn from their coding mistakes.

Instead of forgetting errors after solving them, users can store mistakes, receive AI-generated explanations, search similar mistakes using semantic search, and get personalized learning recommendations through an AI Coach.

The goal of the platform is to transform coding mistakes into a structured learning resource and accelerate problem-solving skills.

---

# Live Demo

Deployment URL:

https://mistakemind-ai.vercel.app

---

# Problem Statement

Many programmers repeatedly make similar coding mistakes while solving Data Structures and Algorithms problems.

Traditional note-taking methods do not provide:

* AI-powered analysis
* Pattern detection
* Similar mistake retrieval
* Personalized learning guidance

MistakeMind AI solves this problem by creating a searchable and intelligent mistake knowledge base.

---

# Features

## Authentication

* User Signup
* User Login
* Secure Session Management
* Password Update

## Mistake Tracking

* Save coding mistakes
* Store wrong code snippets
* Record runtime/compiler errors
* Categorize mistakes by topic

## AI Mistake Analysis

Automatically analyzes mistakes and provides:

* Root Cause Analysis
* Explanation of the Error
* Confidence Score
* Improvement Suggestions

## Semantic Search

Search mistakes using natural language.

Examples:

* binary search infinite loop
* linked list pointer issue
* dp update mistake

Uses vector embeddings to find semantically similar mistakes.

## AI Coach

Ask questions such as:

* Why am I making binary search mistakes?
* What are my weak topics?
* How can I improve my DP skills?

AI Coach analyzes historical mistakes and generates personalized advice.

## Analytics Dashboard

Provides:

* Total Mistakes
* AI Analyses
* Average Confidence Score
* Topics Covered
* Mistakes by Topic Chart
* Confidence Trend Chart

## Mistake Library

* View all mistakes
* Search mistakes
* Manage learning history

---

# System Architecture

User
↓
Next.js Frontend
↓
Next.js API Routes
↓
Supabase PostgreSQL Database
↓
AI Services

* Groq Llama 3.3 70B
* Google Gemini Embeddings

---

# Tech Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS

## Backend

* Next.js API Routes

## Database

* Supabase
* PostgreSQL
* pgvector

## AI Services

### Groq

Used for:

* Mistake Analysis
* AI Coach
* Learning Recommendations

Model:

* Llama 3.3 70B Versatile

### Google Gemini

Used for:

* Vector Embeddings
* Semantic Search

Model:

* text-embedding-004

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/mistakemind-ai.git

cd mistakemind-ai
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

GROQ_API_KEY=

GEMINI_API_KEY=
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Project Structure

```text
mistakemind-ai/

├── app/
├── components/
├── lib/
├── public/
├── screenshots/
├── README.md
├── requirements.txt
├── development-log.md
└── package.json
```

---

# Screenshots

The following screenshots are available inside the screenshots folder:

1. login-page.png
2. dashboard-page.png
3. add-mistake-page.png
4. mistake-library-page.png
5. semantic-search-page.png
6. ai-coach-page.png
7. settings-page.png

---

# Future Enhancements

* Weekly Learning Reports
* Smart Practice Recommendations
* Learning Streak System
* LeetCode Integration
* Interview Preparation Mode
* AI-Generated Revision Notes
* Topic Mastery Tracking

---

# Learning Outcomes

This project demonstrates:

* Full Stack Development
* Authentication Systems
* Database Design
* Vector Databases
* Semantic Search
* AI Integration
* Prompt Engineering
* API Development
* Deployment using Vercel

---

# Author

**Jyotiraditya Basantia**

Computer Science Engineering Student

Project: MistakeMind AI

Version: 1.0

Year: 2026

---

# License

This project is developed for educational and academic purposes.
