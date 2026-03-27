if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/uv/uv.sw.js', {
        scope: __uv$config.prefix
    });
}

const mainUi = document.getElementById('main-ui');
const proxyContainer = document.getElementById('proxy-container');
const proxyFrame = document.getElementById('proxy-frame');
const input = document.getElementById('url-input');
const goBtn = document.getElementById('go-btn');
const exitBtn = document.getElementById('exit-btn');

goBtn.onclick = () => {
    let url = input.value.trim();
    if (!url.includes('.')) {
        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
        url = 'https://' + url;
    }

    // Launch inside the iframe
    const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
    proxyFrame.src = encodedUrl;
    
    // Switch views
    mainUi.style.display = 'none';
    proxyContainer.style.display = 'block';
};

// Exit button logic
exitBtn.onclick = () => {
    proxyFrame.src = 'about:blank';
    proxyContainer.style.display = 'none';
    mainUi.style.display = 'flex';
};

// Panic Key
window.onkeydown = (e) => {
    if (e.key === '`') window.location.replace('https://classroom.google.com');
};
