<div align="center">
  <h1>🌟 Fullstack Todo List Application</h1>
  <p>A modern, robust, and scalable Task Management application built as an assessment for the <b>Intern Developer</b> position.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Spring%20Boot-3.4.x-brightgreen?logo=spring" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/React-18.x-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/Docker-Enabled-blue?logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/JUnit-5-red?logo=junit5" alt="JUnit" />
</div>

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Quick Start (Docker)](#-quick-start-docker-recommended)
- [💻 Manual Setup](#-manual-setup)
- [🌐 API Documentation](#-api-documentation)
- [🧪 Running Unit Tests](#-running-unit-tests)
- [📁 Project Structure](#-project-structure)

---

## ✨ Features

### Core Requirements Completed:
- **CRUD Operations**: Create, Read, Update, and Delete tasks effortlessly.
- **Status Toggling**: Mark tasks as completed or pending with a single click.
- **Search & Filter**: Search by keyword and filter by task status (All / Pending / Completed).
- **Form Validation**: Strict validation on both Client and Server to ensure data integrity.

### Extra Features (Bonus Points):
- **Pagination**: Implemented using Spring Data `Pageable` and controlled seamlessly on the React UI.
- **Modern UI**: Clean, professional, responsive, and minimalist design powered by Tailwind CSS.
- **Dockerized Environment**: Multi-stage `Dockerfile` and `docker-compose` orchestration for hassle-free deployment.
- **Unit Testing**: Comprehensive JUnit 5 and Mockito tests covering `TodoService` business logic.

---

## 🛠️ Tech Stack

**Backend:**
- Java 21
- Spring Boot 3.4
- Spring Data JPA & Hibernate
- MySQL 8.0
- JUnit 5 & Mockito (Testing)

**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios

**DevOps & Infrastructure:**
- Docker & Docker Compose
- Nginx (Frontend Serving)

---

## 🚀 Quick Start (Docker) - Recommended

The easiest way to run the application is via Docker. You don't need to install Node, Java, or MySQL on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lephanquocdai/INTERNDEVELOPER_TODOLIST.git
   cd INTERNDEVELOPER_TODOLIST
   ```

2. **Run Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8080/api/todos

4. **To stop the application:**
   ```bash
   docker-compose down
   ```

---

## 💻 Manual Setup

If you prefer running the application without Docker:

### 1. Database (MySQL)
Create a database named `tododb` with username `root` and password `root`. *(Alternatively, modify `application.yml` inside `TODO_BACKEND` to match your DB credentials).*

### 2. Backend
```bash
cd TODO_BACKEND
./mvnw clean package -DskipTests
java -jar target/todoapp-0.0.1-SNAPSHOT.jar
```

### 3. Frontend
```bash
cd TODO_FRONTEND
npm install
npm run dev
```
The Frontend will be available at http://localhost:5173.

---

## 🌐 API Documentation

All API endpoints are prefixed with `/api/todos`.

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|-------------------|
| `GET` | `/` | Get list of todos (Paginated & Filtered) | `page`, `size`, `status`, `keyword` |
| `POST` | `/` | Create a new todo | - |
| `PUT` | `/{id}` | Update an existing todo | - |
| `DELETE` | `/{id}` | Delete a todo | - |
| `PATCH` | `/{id}/toggle`| Toggle completed status | - |

**Example Request Payload (`POST` & `PUT`):**
```json
{
  "title": "Learn Spring Boot",
  "description": "Complete the intern developer assessment"
}
```

---

## 🧪 Running Unit Tests

The backend includes comprehensive Unit Tests to guarantee business logic stability.

**To run the tests:**
```bash
cd TODO_BACKEND
./mvnw test
```
*Note: A custom configuration `-XX:+EnableDynamicAgentLoading` has been added to `maven-surefire-plugin` to guarantee compatibility with Mockito under Java 21.*

---

## 📁 Project Structure

```text
INTERNDEVELOPER_TODOLIST/
├── docker-compose.yml       # Orchestrates DB, Backend, and Frontend containers
├── README.md                # Project documentation
├── TODO_BACKEND/            # Spring Boot application
│   ├── src/main/java/       # Core business logic (Controllers, Services, Repositories)
│   ├── src/test/java/       # JUnit 5 & Mockito Tests
│   └── Dockerfile           # Multi-stage Java build
└── TODO_FRONTEND/           # React application
    ├── src/                 # UI Components, Tailwind styles, API calls
    ├── nginx.conf           # Nginx routing configuration
    └── Dockerfile           # Multi-stage Node/Nginx build
```

---
<div align="center">
  <p>Built with ❤️ by <b>Le Phan Quoc Dai</b> for the Intern Developer Assessment.</p>
</div>
