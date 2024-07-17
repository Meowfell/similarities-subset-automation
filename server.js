const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to initialize the answers file if it doesn't exist
function initializeAnswersFile() {
    if (!fs.existsSync('answers.json')) {
        fs.writeFileSync('answers.json', '[]', 'utf-8');
    }
}

// Initialize the answers file
initializeAnswersFile();

// Route to handle answer submission
app.post('/submit-answer', (req, res) => {
    const answer = req.body;

    // Read current answers
    let answers = JSON.parse(fs.readFileSync('answers.json', 'utf-8'));

    // Add the new answer
    answers.push(answer);

    // Save the updated answers back to the file
    fs.writeFileSync('answers.json', JSON.stringify(answers, null, 2), 'utf-8');

    console.log('Answer saved:', answer);

    res.json({ status: 'success' });
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
