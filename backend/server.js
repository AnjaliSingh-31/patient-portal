import express from "express";
import multer from "multer";
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

const uploadFolder = "uploads";
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const db = new sqlite3.Database("db.sqlite");

db.run(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    filepath TEXT,
    filesize INTEGER,
    created_at TEXT
)`);

const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files allowed"), false);
        }
        cb(null, true);
    }
});

app.use(express.json());
app.use(express.static("uploads"));

app.post("/documents/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { filename, path: filepath, size } = req.file;

    db.run(
        `INSERT INTO documents (filename, filepath, filesize, created_at)
         VALUES (?, ?, ?, datetime('now'))`,
        [filename, filepath, size],
        function () {
            res.json({ message: "File uploaded", id: this.lastID });
        }
    );
});

app.get("/documents", (_, res) => {
    db.all("SELECT * FROM documents", (err, rows) => {
        res.json(rows);
    });
});

app.get("/documents/:id", (req, res) => {
    db.get("SELECT * FROM documents WHERE id = ?", req.params.id, (err, row) => {
        if (!row) return res.status(404).json({ error: "Not found" });
        res.download(row.filepath);
    });
});

app.delete("/documents/:id", (req, res) => {
    db.get("SELECT * FROM documents WHERE id = ?", req.params.id, (err, row) => {
        if (!row) return res.status(404).json({ error: "Not found" });

        fs.unlinkSync(row.filepath);

        db.run("DELETE FROM documents WHERE id = ?", req.params.id, () => {
            res.json({ message: "Deleted" });
        });
    });
});

app.listen(PORT, () => console.log("Backend running on port", PORT));