# MistakeMind AI 🚀

## AI-Powered Coding Mistake Learning Platform with Retrieval-Augmented Generation (RAG)

MistakeMind AI is an intelligent learning platform that helps programmers track, analyze, search, and learn from their coding mistakes using Artificial Intelligence and Retrieval-Augmented Generation (RAG).

Instead of forgetting coding errors after solving a problem, users can store mistakes, receive AI-generated explanations, retrieve similar mistakes through vector search, and obtain personalized learning recommendations from an AI Coach.

The platform transforms coding mistakes into a searchable knowledge base and creates a personalized learning experience powered by modern AI technologies.

---

# Live Demo

Deployment URL:

https://mistakemind-ai.vercel.app

---

# Problem Statement

Programmers frequently repeat similar mistakes while solving Data Structures and Algorithms problems.

Traditional note-taking methods do not provide:

* AI-powered mistake analysis
* Pattern recognition
* Context-aware retrieval
* Semantic search
* Personalized coaching

MistakeMind AI solves this problem by combining AI analysis with Retrieval-Augmented Generation (RAG) to build an intelligent coding mistake learning system.

---

# Key Innovation: Retrieval-Augmented Generation (RAG)

One of the core features of MistakeMind AI is the implementation of a complete Retrieval-Augmented Generation (RAG) pipeline.

Instead of relying only on a Large Language Model, the system first retrieves relevant historical coding mistakes from a vector database and then uses this information as context for AI-generated responses.

## RAG Workflow

1. User submits a coding mistake.
2. Gemini generates vector embeddings.
3. Embeddings are stored in PostgreSQL using pgvector.
4. User performs a search or asks a coaching question.
5. Query is converted into embeddings.
6. Vector similarity search retrieves the most relevant mistakes.
7. Retrieved mistakes are passed as context to the AI model.
8. Groq generates personalized responses using retrieved knowledge.

## Benefits of RAG

* Personalized recommendations
* Context-aware responses
* Reduced hallucinations
* Semantic understanding
* Improved search accuracy
* Better learning outcomes

---

# Features

## Authentication

* User Signup
* User Login
* Secure Session Management
* Password Management

## Coding Mistake Tracking

* Save coding mistakes
* Store wrong code
* Store compiler/runtime errors
* Organize mistakes by topic

## AI Mistake Analysis

Automatically provides:

* Mistake Type
* Root Cause Analysis
* Confidence Score
* Improvement Suggestions

## Retrieval-Augmented Generation (RAG)

Implemented using:

* Gemini Embeddings
* pgvector
* PostgreSQL
* Semantic Similarity Search
* Groq LLM

## Semantic Search

Search using natural language:

Examples:

* binary search infinite loop
* linked list pointer error
* dynamic programming wrong transition

Returns semantically similar mistakes using vector search.

## AI Coach

Provides:

* Weak topic identification
* Common mistake patterns
* Personalized recommendations
* Learning plans

## Analytics Dashboard

Displays:

* Total Mistakes
* AI Analyses
* Average Confidence
* Topics Covered
* Mistakes by Topic
* Confidence Trends

## Mistake Library

* Browse mistakes
* View learning history
* Review previous analyses

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

Vector Database (pgvector)

↓

Gemini Embeddings

↓

Semantic Retrieval

↓

Groq LLM

↓

Personalized AI Response

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

## Artificial Intelligence

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
* RAG Retrieval Pipeline

Model:

* text-embedding-004

---

# AI Concepts Demonstrated

This project demonstrates practical implementation of:

* Retrieval-Augmented Generation (RAG)
* Vector Embeddings
* Semantic Search
* Prompt Engineering
* Large Language Models (LLMs)
* Personalized AI Systems
* Vector Databases
* Context-Aware AI Responses

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

Available inside the screenshots folder:

1. Login Page
2. Dashboard Overview
3. Add Mistake Page
4. Mistake Library
5. Semantic Search
6. AI Coach
7. Settings Page

---

# Future Enhancements

* Weekly Learning Reports
* Smart Practice Recommendations
* Learning Streak System
* LeetCode Integration
* Interview Preparation Mode
* AI Revision Notes
* Topic Mastery Tracking

---

# Learning Outcomes

Through this project I learned:

* Full Stack Development
* Retrieval-Augmented Generation (RAG)
* Vector Databases
* Semantic Search
* Prompt Engineering
* AI Integration
* API Development
* Cloud Deployment
* Database Management

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
