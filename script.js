// 1. STARFIELD
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function initStars() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<200; i++) stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, s:Math.random()*2, v:Math.random()*0.5});
}
function drawStars() {
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle="white";
    stars.forEach(st => { ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, Math.PI*2); ctx.fill(); st.y += st.v; if(st.y > canvas.height) st.y = 0; });
    requestAnimationFrame(drawStars);
}
initStars(); drawStars();

// 2. MOUSE FIX
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 3. STARTUP SEQUENCE
window.onload = () => {
    setTimeout(() => {
        document.getElementById('step-1').classList.add('hidden');
        document.getElementById('step-2').classList.remove('hidden');
    }, 3000);
};

function nextStep(num) {
    document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
    document.getElementById('step-' + num).classList.remove('hidden');
}

function finishSetup(choice) {
    document.getElementById('setup-overlay').classList.add('hidden');
    if(choice === 'premium') document.getElementById('premium-screen').classList.remove('hidden');
}

// 4. LOGIN (Mark Akopian)
function checkLogin() {
    const u = document.getElementById('pre-user').value;
    const p = document.getElementById('pre-pass').value;
    if(u === "Mark" && p === "Akopian") {
        alert("Welcome, Mark Akopian.");
        document.getElementById('premium-screen').classList.add('hidden');
    } else {
        alert("Access Denied.");
    }
}

// 5. CLOCK
function updateClock() {
    const now = new Date();
    document.getElementById('digital-time').innerText = now.toLocaleTimeString();
    const h = now.getHours(); const m = now.getMinutes(); const s = now.getSeconds();
    document.querySelector('.hour').style.transform = `translateX(-50%) rotate(${h*30+m/2}deg)`;
    document.querySelector('.minute').style.transform = `translateX(-50%) rotate(${m*6}deg)`;
    document.querySelector('.second').style.transform = `translateX(-50%) rotate(${s*6}deg)`;
}
setInterval(updateClock, 1000);

// 6. BROWSER
const home = document.getElementById('home-screen');
const browser = document.getElementById('browser-screen');
const frame = document.getElementById('content-frame');

function launch(url, name) {
    let final = url || document.getElementById('url-input').value.trim();
    if(!final) return;
    if(!url && !final.includes('.')) final = 'https://duckduckgo.com/?q=' + encodeURIComponent(final);
    else if(!url && !final.startsWith('http')) final = 'https://' + final;
    
    frame.src = final;
    document.getElementById('display-url').innerText = name || final;
    home.classList.add('hidden');
    browser.classList.remove('hidden');
}

window.openApp = (u, n) => launch(u, n);
document.getElementById('go-btn').onclick = () => launch();
document.getElementById('exit-btn').onclick = () => { frame.src = ""; browser.classList.add('hidden'); home.classList.remove('hidden'); };

// 7. PANIC KEY
window.onkeydown = (e) => {
    if (e.key === '`') {
        window.open('https://classroom.google.com', '_blank');
        window.location.replace('https://clever.com');
    }
};

// PREM TRIGGER FROM HOME
document.getElementById('premium-trigger').onclick = () => document.getElementById('premium-screen').classList.remove('hidden');
document.getElementById('close-prem-btn').onclick = () => document.getElementById('premium-screen').classList.add('hidden');
