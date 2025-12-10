Design Document – Patient Document Portal
1. Tech Stack Choices
Q1. Frontend Framework

I chose React + Vite because:

Vite is extremely fast for local development

React is widely used, simple to set up, and works well for building dynamic UIs

Component-based structure keeps the UI clean and maintainable

Q2. Backend Framework

I chose Node.js with Express because:

It is lightweight and perfect for simple REST APIs

Multer integrates easily for PDF uploads

Large community support and simple routing

Works well with SQLite for small projects

Q3. Database Choice

I chose SQLite because:

No setup required

Stores data in a local .sqlite file

Supports SQL queries

Ideal for small, single-user local assignments

If this moved to production, I would switch to PostgreSQL.

Q4. Scaling to 1,000 users

To scale to many users, I would:

Move storage to AWS S3 or GCP Cloud Storage

Use PostgreSQL instead of SQLite

Add JWT authentication

Introduce Nginx load balancer + multiple backend servers

Use Redis for caching file metadata

Implement background workers for file processing

2. Architecture Overview
System Flow
[React Frontend]
        |
        v
[Express Backend API]
        |
        +----------------------+
        |                      |
        v                      v
[SQLite Database]        [/uploads folder]

Explanation

Frontend sends API requests (upload, delete, download).

Backend handles file validation, saving, retrieving, and deleting.

DB stores metadata (filename, size, upload date).

File System stores actual PDF files.

3. API Specification
POST /documents/upload

Description: Upload a PDF file
Request:

Content-Type: multipart/form-data
file: <pdf>


Response:

{
  "message": "File uploaded",
  "id": 1
}

GET /documents

Description: List all uploaded documents
Response:

[
  {
    "id": 1,
    "filename": "170213123-report.pdf",
    "filesize": 204800,
    "created_at": "2025-12-11 12:00:00"
  }
]

GET /documents/:id

Description: Download a document
Response:
Binary PDF stream

DELETE /documents/:id

Description: Delete document
Response:

{
  "message": "Deleted"
}

4. Data Flow Description
Q5A. What happens when a file is uploaded?

User selects PDF file in UI.

React sends POST request with FormData.

Express receives and validates:

ensures MIME type is PDF

Multer saves file in /uploads folder.

Backend inserts metadata into SQLite table.

Returns success response to frontend.

Frontend reloads file list.

Q5B. What happens when a file is downloaded?

User clicks “Download”.

React opens backend URL /documents/:id.

Backend fetches file path from DB.

Backend returns the PDF file for download.

5. Assumptions
Q6. Assumptions Made

Only PDFs are allowed.

Maximum file size: 5 MB.

No user login (single user system).

SQLite can handle low traffic.

This is a local app, so no concurrency issues.

No versioning of documents.

File names are stored using timestamps to avoid collisions.