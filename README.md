# Local AI Chatbot (Spring Boot + React + Ollama)

A robust, Google Gemini-style AI chatbot powered by a Spring Boot backend and a React (Vite) frontend, using Ollama with the Gemma 2B model for local inference.

## 🚀 Project Structure

- **`backend/`**: Spring Boot application (Java 17) providing the REST API.
- **`frontend/`**: React application (Vite) with Framer Motion animations and Markdown support.

## 🛠️ Prerequisites

- **Java 17+**
- **Node.js 18+**
- **Ollama**: [Download Ollama](https://ollama.com/) and pull the Gemma 2B model:
  ```bash
  ollama pull gemma:2b
  ```

## 🏃 Getting Started

### 1. Start the Backend
Navigate to the `backend` directory and run:
```bash
./mvnw spring-boot:run
```
The backend will start on `http://localhost:9090`.

### 2. Start the Frontend
Navigate to the `frontend` directory and run:
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## ✨ Features

- **Google Gemini UI**: Collapsible sidebar, minimalist layout, and user/AI avatars.
- **Markdown Support**: Beautifully rendered code blocks, lists, and formatting.
- **Soft Loading**: Skeleton pulse animations for a smoother user experience.
- **Chat History**: Sidebar tracking of recent questions.
- **One-Click Copy**: Easily copy AI responses to your clipboard.

## 📦 Deployment Note

The frontend is configured to communicate with the backend on `localhost:9090`. To host this online, you would need to:
1. Deploy the backend to a service like Render or Railway.
2. Deploy the frontend to Vercel or Netlify.
3. Update the `API_BASE_URL` in `frontend/src/api.js` to your deployed backend URL.
