# 🎥 Gallery Backend - Video Upload and Retrieval API

This is the backend service for uploading and fetching videos, built with **Spring Boot**.

---

## 📋 API Endpoints

| Method | Endpoint           | Description                                                |
|:------:|:-------------------|:-----------------------------------------------------------|
| POST   | `/upload`           | Upload a video file with title and description.            |
| GET    | `/getAllId`         | Fetch a list of all video IDs stored in the system.         |
| GET    | `/getAllVideo`      | Fetch complete details (title, path, description) of videos.|

---

## 🚀 How to Run the Project

```bash
# Clone the repository
git clone https://github.com/nistha01/gallery.git

# Navigate into the project directory
cd Gallery

# Run the Spring Boot Application
./mvnw spring-boot:run
