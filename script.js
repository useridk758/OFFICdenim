let isLocked = false;

// STARTUP
window.onload = () => {
    setTimeout(() => {
        document.getElementById('step-1').classList.add('hidden');
        document.getElementById('step-2').classList.remove('hidden');
    }, 2000);
};

function nextStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
    document.getElementById('step-' + n).classList.remove('hidden');
}

function finishSetup() { document.getElementById('setup-overlay').style.display = 'none'; }

// CLOCK ENGINE
function updateClock() {
    const now = new Date();
    document.getElementById('digital-time').innerText = now.toLocaleTimeString();
    document.getElementById('hero-time').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    document.getElementById('hero-date').innerText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();

    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    document.querySelector('.hour').style.transform = `translateX(-50%) rotate(${h*30+m/2}deg)`;
    document.querySelector('.minute').style.transform = `translateX(-50%) rotate(${m*6}deg)`;
    document.querySelector('.second').style.transform = `translateX(-50%) rotate(${s*6}deg)`;
}
setInterval(updateClock, 1000); updateClock();

// BROWSER LOGIC
const frame = document.getElementById('content-frame');
const loader = document.getElementById('loader');
const bInput = document.getElementById('browser-address');

function openApp(url, name, canEdit) {
    isLocked = !canEdit;
    bInput.value = url;
    bInput.readOnly = !canEdit;
    launch(url);
}

function launch(url) {
    let target = url || document.getElementById('url-input').value.trim();
    if(!target) return;
    if(!target.startsWith('http')) target = 'https://' + (target.includes('.') ? target : 'google.com/search?q=' + target);
    
    loader.classList.remove('hidden');
    frame.src = target;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('browser-screen').classList.remove('hidden');
}

frame.onload = () => { loader.classList.add('hidden'); };

bInput.onkeydown = (e) => {
    if(e.key === 'Enter' && !isLocked) launch(bInput.value);
};

function goHome() {
    document.getElementById('browser-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
    frame.src = "";
}

function refreshPage() { frame.src = frame.src; loader.classList.remove('hidden'); }

document.getElementById('url-input').onkeydown = (e) => { if(e.key === 'Enter') launch(); };

// PANIC
window.onkeydown = (e) => {
    if (e.key === '`') window.location.replace('https://clever.com');
};
