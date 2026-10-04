const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/analyze', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    console.log('Analyzing URL: ' + url);

    setTimeout(() => {
        const isSuspicious = url.includes('phishing') || url.includes('malware');
        res.json({
            url: url,
            riskScore: isSuspicious ? 85 : 10,
            status: isSuspicious ? 'مشبوه' : 'آمن'
        });
    }, 1500);
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});