let currentAppIsProtected = false;

window.onload = () => {
    setTimeout(() => {
        document.getElementById('step-1').classList.add('hidden');
        document.getElementById('step-2').classList.remove('hidden');
    }, 3000);
};

function nextStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
    document.getElementById('step-' + n).classList.remove('hidden');
}

function finishSetup() { document.getElementById('setup-overlay').style.display = 'none'; }

// CLOCK SYSTEM
function updateClock() {
    const now = new Date();
    document.getElementById('digital-time').innerText = now.toLocaleTimeString();
    document.getElementById('hero-time').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    document.getElementById('hero-date').innerText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    document.querySelector('.hour').style.transform = `translateX(-50%) rotate(${h*30+m/2}deg)`;
    document.querySelector('.minute').style.transform = `translateX(-50%) rotate(${m*6}deg)`;
    document.querySelector('.second').style.transform = `translateX(-50%) rotate(${s*6}deg)`;
}
setInterval(updateClock, 1000); updateClock();

// BROWSER ENGINE
const frame = document.getElementById('content-frame');
const spinner = document.getElementById('loading-spinner');
const browserInput = document.getElementById('browser-url-input');

function openApp(url, name, canChange) {
    currentAppIsProtected = !canChange;
    browserInput.value = url;
    browserInput.disabled = !canChange;
    launch(url);
}

function launch(url) {
    spinner.classList.remove('hidden');
    let final = url || document.getElementById('url-input').value.trim();
    if(!final.startsWith('http')) final = 'https://' + (final.includes('.') ? final : 'duckduckgo.com/?q=' + final);
    
    frame.src = final;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('browser-screen').classList.remove('hidden');
}

// SPINNER LOGIC
frame.onload = () => { spinner.classList.add('hidden'); };

browserInput.onkeydown = (e) => {
    if(e.key === 'Enter' && !currentAppIsProtected) launch(browserInput.value);
};

function goHome() {
    document.getElementById('browser-screen').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');
    frame.src = "";
}

function refreshPage() { frame.src = frame.src; spinner.classList.remove('hidden'); }

document.getElementById('go-btn').onclick = () => openApp(null, 'Web', true);
document.getElementById('exit-btn').onclick = goHome;
