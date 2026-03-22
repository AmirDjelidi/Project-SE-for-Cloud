const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/coffee', async (req, res) => {
    const cups = parseInt(req.query.cups);

    if (isNaN(cups) || cups < 0) {
        return res.status(400).json({ 
            error: "Please provide a valid number of coffee cups (?cups=X)" 
        });
    }

    let linesOfCode = 0;
    if (cups === 0) linesOfCode = 5;
    else if (cups <= 3) linesOfCode = cups * 150;
    else if (cups <= 6) linesOfCode = cups * 300;
    else linesOfCode = cups * 500;


    try {
        // Service 1 contacts Service 2 via the internal Kubernetes network
        const response = await fetch(`http://localhost:3002/api/bugs?lines=${linesOfCode}`);
        const bugData = await response.json();

        res.json({
            coffee_cups: cups,
            estimated_lines_of_code: linesOfCode,
            bug_analysis: bugData,
            message: "Success: Combined calculation (Service 1 ➔ Service 2)"
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Communication error with Service 2", 
            details: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`The Caffeine microservice is running on http://localhost:${port}`);
});