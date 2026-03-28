const homeScreen = document.getElementById('home-screen');
const browserScreen = document.getElementById('browser-screen');
const frame = document.getElementById('content-frame');
const input = document.getElementById('url-input');
const urlDisplay = document.getElementById('display-url');

// 1. CLOCK LOGIC
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('clock-section').innerText = `${dateStr} | ${timeStr}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. SEARCH & LAUNCH LOGIC
function launchSite(customURL, displayName) {
    let url = customURL || input.value.trim();
    if (!url) return;

    if (!customURL) {
        // If it doesn't have a dot (.), it's a search term
        if (!url.includes('.')) {
            url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
            urlDisplay.innerText = "DuckDuckGo Search";
        } else {
            if (!url.startsWith('http')) url = 'https://' + url;
            urlDisplay.innerText = url;
        }
    } else {
        urlDisplay.innerText = displayName;
    }

    frame.src = url;
    homeScreen.classList.add('hidden');
    browserScreen.classList.remove('hidden');
}

// Global function for tiles
window.openApp = (url, name) => launchSite(url, name);

document.getElementById('go-btn').onclick = () => launchSite();
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') launchSite(); });

document.getElementById('exit-btn').onclick = () => {
    frame.src = "about:blank";
    browserScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
};

// Panic Key
window.onkeydown = (e) => {
    if (e.key === '`') window.location.replace('https://classroom.google.com');
};
