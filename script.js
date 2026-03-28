const homeScreen = document.getElementById('home-screen');
const browserScreen = document.getElementById('browser-screen');
const frame = document.getElementById('content-frame');
const input = document.getElementById('url-input');
const goBtn = document.getElementById('go-btn');
const exitBtn = document.getElementById('exit-btn');
const urlDisplay = document.getElementById('display-url');

function launchSite() {
    let url = input.value.trim();
    if (!url) return;

    // Logic to fix the URL format
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    urlDisplay.innerText = url;
    frame.src = url;
    
    homeScreen.classList.add('hidden');
    browserScreen.classList.remove('hidden');
}

// Click Go button
goBtn.onclick = launchSite;

// Press Enter key
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') launchSite();
});

// Exit logic
exitBtn.onclick = () => {
    frame.src = "about:blank";
    browserScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
};

// Panic Key (`)
window.onkeydown = (e) => {
    if (e.key === '`') window.location.replace('https://classroom.google.com');
};
