document.getElementById('go-btn').addEventListener('click', () => {
    const url = document.getElementById('url-input').value;
    if (url) {
        // Redirects to our proxy endpoint with the URL as a query
        window.location.href = `/proxy?url=${encodeURIComponent(url)}`;
    }
});
