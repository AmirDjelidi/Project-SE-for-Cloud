const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3002;

const pool = new Pool({
    user: 'admin',
    host: 'localhost', 
    database: 'caffeine_logs',
    password: 'password123',
    port: 5432,
});


pool.query(`
    CREATE TABLE IF NOT EXISTS bug_logs (
        id SERIAL PRIMARY KEY,
        analyzed_lines INT,
        bug_rate VARCHAR(10),
        critical_bugs INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`).then(() => console.log("📦 'bug_logs' table ready in PostgreSQL."))
  .catch(err => console.error("Error creating table", err));

app.use(express.json());

app.get('/api/bugs', async (req, res) => {
    const lines = parseInt(req.query.lines);

    if (isNaN(lines) || lines < 0) {
        return res.status(400).json({ error: "Invalid number of lines" });
    }

    let bugRate = "0%";
    let criticalBugs = 0;

    if (lines > 0 && lines <= 450) {
        bugRate = "5%";
        criticalBugs = 1;
    } else if (lines > 450 && lines <= 1800) {
        bugRate = "40%";
        criticalBugs = 12;
    } else if (lines > 1800) {
        bugRate = "99.9%";
        criticalBugs = 404;
    }

    try {
        await pool.query(
            'INSERT INTO bug_logs (analyzed_lines, bug_rate, critical_bugs) VALUES ($1, $2, $3)',
            [lines, bugRate, criticalBugs]
        );
        console.log(`📝 Log saved to DB: ${lines} lines analyzed.`);
    } catch (err) {
        console.error("Error inserting into DB:", err);
    }

    res.json({
        analyzed_lines: lines,
        bug_rate: bugRate,
        critical_bugs_detected: criticalBugs,
        status: "Analysis performed by Service 2 and saved to DB"
    });
});

app.listen(port, () => {
    console.log(`Bug Predictor Service on port ${port}`);
});