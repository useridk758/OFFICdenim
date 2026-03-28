// STARTUP SEQUENCE
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
    document.getElementById('setup-overlay').style.display = 'none';
    if(choice === 'premium') document.getElementById('premium-screen').classList.remove('hidden');
}

// PREMIUM (Mark Akopian)
function checkLogin() {
    if(document.getElementById('pre-user').value === "Mark" && 
       document.getElementById('pre-pass').value === "Akopian") {
        alert("Access Granted.");
        document.getElementById('premium-screen').classList.add('hidden');
    } else { alert("Denied."); }
}

// CLOCK ENGINE
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    document.getElementById('digital-time').innerText = now.toLocaleTimeString();
    document.getElementById('hero-time').innerText = timeStr.replace(' AM', '').replace(' PM', '');
    document.getElementById('hero-date').innerText = dateStr;

    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    document.querySelector('.hour').style.transform = `translateX(-50%) rotate(${h*30+m/2}deg)`;
    document.querySelector('.minute').style.transform = `translateX(-50%) rotate(${m*6}deg)`;
    document.querySelector('.second').style.transform = `translateX(-50%) rotate(${s*6}deg)`;
}
setInterval(updateClock, 1000); updateClock();

// BROWSER
const home = document.getElementById('home-screen');
const browser = document.getElementById('browser-screen');
const frame = document.getElementById('content-frame');

function launch(url, name) {
    let final = url || document.getElementById('url-input').value.trim();
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
document.getElementById('url-input').onkeydown = (e) => { if(e.key === 'Enter') launch(); };
document.getElementById('exit-btn').onclick = () => { frame.src = ""; browser.classList.add('hidden'); home.classList.remove('hidden'); };

document.getElementById('premium-trigger').onclick = () => document.getElementById('premium-screen').classList.remove('hidden');
document.getElementById('close-prem-btn').onclick = () => document.getElementById('premium-screen').classList.add('hidden');

// PANIC
window.onkeydown = (e) => {
    if (e.key === '`') {
        window.open('https://classroom.google.com', '_blank');
        window.location.replace('https://clever.com');
    }
};
