📌 Overview

The Patient Document Portal is a simple full-stack system that allows users to manage their medical PDF files.
It provides a clean UI and a REST API backend that handles:

📤 PDF Upload

📄 Document Listing

⬇️ File Download

🗑️ File Deletion

Ideal for learning file handling, API integration, and full-stack workflow.

🔧 Tech Stack
🎨 Frontend

⚛️ React

⚡ Vite

🎨 (Optional) TailwindCSS

🖥️ Backend

🟢 Node.js

🚏 Express.js

📄 Multer — for handling PDF uploads

🗄️ Database

🧱 SQLite
Stores metadata:
id, filename, filepath, filesize, created_at

📷 Screenshots

(Replace these with your actual screenshots)

📤 Upload Page

📄 Documents List

⚙️ Project Structure
patient-portal/
│── backend/
│    ├── server.js
│    ├── db.js
│    ├── uploads/
│    └── routes/documents.js
│
│── frontend/
│    ├── src/
│    ├── index.html
│    └── vite.config.js
│
│── design.md
│── README.md

🚀 How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/AnjaliSingh-31/patient-portal.git
cd patient-portal

🖥️ Backend Setup
cd backend
npm install
npm start


Backend will run on:

http://localhost:5000

🎨 Frontend Setup
cd frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5173

🔌 API Documentation
📤 Upload PDF

POST /documents/upload
Uploads a PDF file.

Request

Form-Data:

file: <PDF File>

Response
{
  "message": "File uploaded successfully",
  "document": {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 102400,
    "created_at": "2025-01-01"
  }
}

📄 List All Documents

GET /documents

Response
[
  {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 102400,
    "created_at": "2025-01-01"
  }
]

⬇️ Download File

GET /documents/:id

Returns the PDF file as an attachment.

🗑️ Delete File

DELETE /documents/:id

Response
{
  "message": "Document deleted successfully"
}

🔐 Assumptions

Only PDF files are allowed.

Max file size: 5 MB.

No authentication (single user system).

SQLite is enough for assignment-level use.

📘 Design Document

See design.md in the repository for:

Architecture Diagram

API flow

Tech choices explanations

Scalability notes
