const searchUI = document.getElementById('search-ui');
const browserUI = document.getElementById('browser-ui');
const siteViewer = document.getElementById('site-viewer');
const urlInput = document.getElementById('target-url');
const launchBtn = document.getElementById('launch-btn');
const closeBtn = document.getElementById('back-home');

launchBtn.onclick = () => {
    let url = urlInput.value.trim();

    if (!url) return;

    // Force HTTPS if they didn't type it
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    // Load the URL into the iframe
    siteViewer.src = url;

    // Swap screens
    searchUI.style.display = 'none';
    browserUI.style.display = 'block';
};

closeBtn.onclick = () => {
    // Reset and go back
    siteViewer.src = "";
    browserUI.style.display = 'none';
    searchUI.style.display = 'flex';
};

// Panic Key
window.onkeydown = (e) => {
    if (e.key === '`') window.location.replace('https://classroom.google.com');
};
