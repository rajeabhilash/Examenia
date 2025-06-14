# Examenia
## AI Powered exam challenge generator


## Table of Contents

1.  [Project Overview](#1-project-overview)
2.  [Features](#2-features)
3.  [Technologies Used](#3-technologies-used)
    * [Frontend](#frontend)
    * [Backend](#backend)
    * [Database & AI](#database--ai)
4.  [Getting Started](#4-getting-started)
    * [Prerequisites](#prerequisites)
    * [Local Development Setup](#local-development-setup)
        * [1. Clone the Repository](#1-clone-the-repository)
        * [2. Backend Setup](#2-backend-setup)
        * [3. Frontend Setup](#3-frontend-setup)
        * [4. Running the Application](#4-running-the-application)
5.  [Project Structure](#5-project-structure)
6.  [Usage](#6-usage)
7.  [Authentication & Authorization](#7-authentication--authorization)
8.  [API Endpoints (Backend)](#8-api-endpoints-backend)
9.  [Contributing](#9-contributing)
10. [License](#10-license)
11. [Contact](#11-contact)

---

## 1. Project Overview

Project Examenia is an **AI-powered Multiple Choice Question (MCQ) Challenge Generator** designed to create dynamic and engaging quizzes on various topics. Leveraging cutting-edge AI models, it allows users to generate custom challenges, test their knowledge, and receive instant feedback. The project combines a robust backend for AI processing and data management with a modern, interactive frontend for a seamless user experience.

Whether you're a student looking to practice, an educator seeking to create quick assessments, or simply someone curious to learn, Examenia provides an intelligent and customizable platform for knowledge challenges.

## 2. Features

* **AI-Powered MCQ Generation:** Utilizes advanced Large Language Models (LLMs) to dynamically create diverse and relevant MCQ questions based on user-provided topics or content.
* **Custom Challenge Creation:** Users can define challenge parameters, including topic, difficulty, number of questions, and question types.
* **User Authentication & Management:** Secure sign-up, login, and user profile management using Clerk.
* **Persistent Data Storage:** Saves user-generated challenges, scores, and user data for future access and progress tracking.
* **Interactive Frontend:** A responsive and intuitive user interface built with React.js for creating, taking, and reviewing challenges.
* **Real-time Feedback:** Provides immediate results and explanations for answers.
* **Scalable Architecture:** Built with FastAPI for a high-performance and scalable API layer.
* **Cross-Platform Compatibility:** Accessible via web browsers on various devices.

## 3. Technologies Used

This project leverages a modern tech stack to deliver its features.

### Frontend

* **React.js:** A JavaScript library for building user interfaces, providing a component-based architecture for a modular and maintainable codebase.
* **Vite:** A fast build tool for modern web projects, used for rapid development and optimized builds.
* **Tailwind CSS (Optional, but common with React):** A utility-first CSS framework for rapidly building custom designs.
* **React Router (Optional):** For handling navigation within the single-page application.
* **Axios (Optional):** For making HTTP requests to the backend API.
* **Clerk Frontend SDK:** Integrates with Clerk for seamless user authentication on the client-side.

### Backend

* **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
* **Python:** The core programming language for the backend logic.
* **Uvicorn:** An ASGI server to run the FastAPI application.
* **SQLAlchemy (ORM):** A powerful Object Relational Mapper for interacting with the database, allowing Python objects to represent database tables.
* **Pydantic:** Used by FastAPI for data validation and serialization, ensuring robust API contracts.
* **Clerk Backend SDK:** For verifying and managing user sessions and data from the backend.
* **[Add any other specific Python libraries you use for data processing, utility, etc., e.g., `python-dotenv` for environment variables, `requests` for external API calls]**

### Database & AI

* **PostgreSQL:** A powerful, open-source relational database system used for storing user data, challenges, questions, and scores.
* **Large Language Models (LLMs):**
    * **Provider:** [Specify your LLM provider, e.g., OpenAI (GPT-3.5/GPT-4), Google Gemini, Llama 3, Anthropic Claude, etc.]
    * **Libraries:** [e.g., `openai` Python library, `google-generativeai`, `huggingface_hub`]
    * **Techniques (Optional):** [e.g., Prompt Engineering, RAG (Retrieval-Augmented Generation) if applicable, fine-tuning etc.]

## 4. Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Git:** For cloning the repository.
    * [https://git-scm.com/downloads](https://git-scm.com/downloads)
* **Node.js & npm (or Yarn):** For the Frontend development.
    * [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* **Python 3.9+:** For the Backend development.
    * [https://www.python.org/downloads/](https://www.python.org/downloads/)
* **PostgreSQL:** The database server.
    * [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
* **Clerk Account:** You'll need an account at Clerk.com to obtain API keys for authentication.
    * [https://clerk.com/](https://clerk.com/)
* **LLM Provider API Key:** An API key for your chosen LLM provider (e.g., OpenAI API Key).

### Local Development Setup

#### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone [https://github.com/rajeabhilash/Examenia.git](https://github.com/rajeabhilash/Examenia.git)
cd Examenia

cd backend

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt # You'll need to create this file later (pip freeze > requirements.txt)

# Create a .env file for environment variables
# In the `backend` directory, create a file named `.env` and add the following:
# Replace placeholders with your actual values
echo "DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_database_name" >> .env
echo "CLERK_SECRET_KEY=sk_test_..." >> .env
echo "OPENAI_API_KEY=sk-..." >> .env # Or your specific LLM API key variable
echo "LLM_PROVIDER=openai" >> .env # e.g., openai, gemini, etc.
# Add any other sensitive or configurable variables here

-- Example SQL commands for PostgreSQL (run via psql or pgAdmin)
CREATE DATABASE examenia_db;
CREATE USER examenia_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE examenia_db TO examenia_user;

# Example (replace with your actual migration command if you use one)
# python -m alembic upgrade head

cd frontend

# Install frontend dependencies
npm install # or yarn install

# Create a .env file for environment variables
# In the `frontend` directory, create a file named `.env` and add the following:
# Replace placeholders with your actual values
echo "VITE_CLERK_PUBLISHABLE_KEY=pk_test_..." >> .env
echo "VITE_BACKEND_URL=http://localhost:8000" >> .env
# Add any other frontend-specific environment variables

uvicorn main:app --reload --host 0.0.0.0 --port 8000
npm run dev # or yarn dev

Project Examenia/
├── backend/                  # Contains the FastAPI application and AI logic
│   ├── app/                  # FastAPI application source code
│   │   ├── api/              # API routes (e.g., users, challenges, auth)
│   │   ├── core/             # Configuration, settings, constants
│   │   ├── crud/             # Create, Read, Update, Delete operations for DB
│   │   ├── database/         # Database connection, models (SQLAlchemy)
│   │   ├── schemas/          # Pydantic models for request/response data
│   │   ├── services/         # Business logic, AI integration
│   │   └── main.py           # Main FastAPI application entry point
│   ├── migrations/           # Database migration scripts (e.g., Alembic)
│   ├── venv/                 # Python virtual environment (ignored by Git)
│   ├── .env                  # Environment variables (sensitive, NOT committed)
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Optional: Backend-specific README
├── frontend/                 # Contains the React.js application
│   ├── public/               # Static assets
│   ├── src/                  # React source code
│   │   ├── assets/           # Images, icons, fonts
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Main application pages/views
│   │   ├── services/         # API interaction logic
│   │   ├── App.jsx           # Main React component
│   │   └── main.jsx          # Entry point for React app
│   ├── node_modules/         # Node.js dependencies (ignored by Git)
│   ├── .env                  # Environment variables (sensitive, NOT committed)
│   ├── package.json          # Node.js project metadata and dependencies
│   ├── vite.config.js        # Vite configuration
│   └── README.md             # Optional: Frontend-specific README
├── .gitignore                # Specifies intentionally untracked files to ignore
├── LICENSE                   # Project license (e.g., MIT, Apache 2.0)
└── README.md                 # This file


