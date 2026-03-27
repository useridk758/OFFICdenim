const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// This handles the proxy logic
app.use('/proxy', (req, res, next) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.send("No URL provided.");

    createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: { '^/proxy': '' },
        router: (req) => req.query.url,
    })(req, res, next);
});

app.listen(PORT, () => {
    console.log(`Proxy running at http://localhost:${PORT}`);
});
