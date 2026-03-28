// 1. STARFIELD ANIMATION
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<150; i++) {
        stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: Math.random()*2, v: Math.random()*0.4 });
    }
}
function drawStars() {
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle="white";
    stars.forEach(st => {
        ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, Math.PI*2); ctx.fill();
        st.y += st.v; if(st.y > canvas.height) st.y = 0;
    });
    requestAnimationFrame(drawStars);
}
initStars(); drawStars();

// 2. MOUSE
const cursor = document.getElementById('cursor');
window.onmousemove = (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; };

// 3. CLOCKS
function updateClock() {
    const now = new Date();
    document.getElementById('digital-time').innerText = now.toLocaleDateString() + ' | ' + now.toLocaleTimeString();
    const h = now.getHours(); const m = now.getMinutes(); const s = now.getSeconds();
    document.querySelector('.hour').style.transform = `translateX(-50%) rotate(${h*30 + m/2}deg)`;
    document.querySelector('.minute').style.transform = `translateX(-50%) rotate(${m*6}deg)`;
    document.querySelector('.second').style.transform = `translateX(-50%) rotate(${s*6}deg)`;
}
setInterval(updateClock, 1000);

// 4. PANIC LOGIC
window.onkeydown = (e) => {
    if (e.key === '`') {
        window.open('https://classroom.google.com', '_blank');
        window.location.replace('https://clever.com');
    }
};

// 5. BROWSER LOGIC
const home = document.getElementById('home-screen');
const browser = document.getElementById('browser-screen');
const frame = document.getElementById('content-frame');
const input = document.getElementById('url-input');

function launch(url, name) {
    let final = url || input.value.trim();
    if(!final) return;
    if(!url) {
        if(!final.includes('.')) final = 'https://duckduckgo.com/?q=' + encodeURIComponent(final);
        else if(!final.startsWith('http')) final = 'https://' + final;
    }
    frame.src = final;
    document.getElementById('display-url').innerText = name || final;
    home.classList.add('hidden');
    browser.classList.remove('hidden');
}

window.openApp = (u, n) => launch(u, n);
document.getElementById('go-btn').onclick = () => launch();
input.onkeydown = (e) => { if(e.key === 'Enter') launch(); };

document.getElementById('exit-btn').onclick = () => {
    frame.src = "about:blank";
    browser.classList.add('hidden');
    home.classList.remove('hidden');
};
