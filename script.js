// 1. STARFIELD ANIMATION
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<200; i++) {
        stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*2, speed: Math.random()*0.5 });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
        s.y += s.speed; if(s.y > canvas.height) s.y = 0;
    });
    requestAnimationFrame(drawStars);
}
initStars(); drawStars();

// 2. CUSTOM MOUSE
const cursor = document.getElementById('cursor');
window.onmousemove = (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
};

// 3. CLOCK LOGIC (Digital & Analog)
function updateClocks() {
    const now = new Date();
    document.getElementById('digital-time').innerText = now.toLocaleDateString() + ' | ' + now.toLocaleTimeString();

    const h = now.getHours(); const m = now.getMinutes(); const s = now.getSeconds();
    document.querySelector('.hour').style.transform = `translateX(-50%) rotate(${h * 30 + m/2}deg)`;
    document.querySelector('.minute').style.transform = `translateX(-50%) rotate(${m * 6}deg)`;
    document.querySelector('.second').style.transform = `translateX(-50%) rotate(${s * 6}deg)`;
}
setInterval(updateClocks, 1000);

// 4. PANIC KEY (Dual Action)
window.onkeydown = (e) => {
    if (e.key === '`') {
        window.open('https://classroom.google.com', '_blank'); // New tab
        window.location.replace('https://clever.com'); // Current tab
    }
};

// 5. SEARCH & LAUNCH
const home = document.getElementById('home-screen');
const browser = document.getElementById('browser-screen');
const frame = document.getElementById('content-frame');

function launch(url, name) {
    let finalUrl = url || document.getElementById('url-input').value.trim();
    if(!finalUrl) return;
    
    if(!url) {
        if(!finalUrl.includes('.')) finalUrl = 'https://duckduckgo.com/?q=' + encodeURIComponent(finalUrl);
        else if(!finalUrl.startsWith('http')) finalUrl = 'https://' + finalUrl;
    }
    
    frame.src = finalUrl;
    document.getElementById('display-url').innerText = name || finalUrl;
    home.classList.add('hidden');
    browser.classList.remove('hidden');
}

window.openApp = (u, n) => launch(u, n);
document.getElementById('go-btn').onclick = () => launch();

document.getElementById('exit-btn').onclick = () => {
    frame.src = "about:blank";
    browser.classList.add('hidden');
    home.classList.remove('hidden');
};
