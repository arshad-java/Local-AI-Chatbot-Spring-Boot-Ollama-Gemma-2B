# 🤖 Local AI Chatbot – Spring Boot & Ollama

A full-stack AI chatbot application that runs entirely on a local machine using **Spring Boot**, **JavaScript**, and **Ollama (Gemma 2B)**.

This project simulates a ChatGPT-like experience without relying on paid APIs, ensuring privacy and offline capability.

---

## 🚀 Features

* 💬 ChatGPT-style conversational UI
* ⚡ REST API built with Spring Boot
* 🧠 Local LLM integration using Ollama (Gemma:2B)
* 🔄 Async communication using Fetch API
* ✨ Typing indicator & auto-scrolling UI
* 📝 Stores last 5 user queries (in-memory)
* 📜 Displays recent chat history
* 🔌 WebClient integration for AI calls

---

## 🏗️ Tech Stack

**Backend**

* Java
* Spring Boot
* WebClient

**Frontend**

* HTML
* CSS
* JavaScript (Fetch API)

**AI Model**

* Ollama
* Gemma:2B (local LLM)

---

## ⚙️ How It Works

1. User enters a query in the chat UI
2. Frontend sends request to `/api` endpoint
3. Spring Boot backend calls Ollama using WebClient
4. Ollama processes input using Gemma model
5. Response is returned and displayed in UI

---

## 📦 API Endpoints

### POST `/api`

* Send user query to AI
* Returns AI-generated response

### GET `/api/history`

* Returns last 5 user queries

---

## 🖥️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install & Run Ollama

Download and install Ollama from:
https://ollama.com

Pull the model:

```bash
ollama pull gemma:2b
```

Run the model:

```bash
ollama run gemma:2b
```

---

### 3️⃣ Run Spring Boot Application

```bash
./mvnw spring-boot:run
```

or run via your IDE (Eclipse/IntelliJ)

---

### 4️⃣ Open Frontend

Open `index.html` in browser
OR serve via Spring Boot static resources

---

## 📸 UI Preview



---

## 🎯 Key Learnings

* Building REST APIs using Spring Boot
* Integrating local LLMs without external APIs
* Handling async frontend-backend communication
* Managing in-memory state using Deque
* Creating responsive chat UI

---

## 🔮 Future Enhancements

* 📂 MongoDB for full chat history
* 📄 RAG (PDF-based Q&A)
* 🎙️ Voice input/output
* ⚡ Streaming responses
* 🐳 Docker deployment

---

## 🙌 Contribution

Feel free to fork this repo and improve it!

---

## 📧 Contact

🌐 Portfolio: https://arshad-ai.vercel.app/
Feel free to reach out for collaboration, opportunities, or feedback!

---
