if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/uv/uv.sw.js', {
            scope: __uv$config.prefix
        });
    });
}

const input = document.getElementById('url-input');
const btn = document.getElementById('go-btn');

btn.onclick = () => {
    let url = input.value.trim();
    if (!url.includes('.')) {
        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
        url = 'https://' + url;
    }
    location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
};

// Panic Key
window.onkeydown = (e) => {
    if (e.key === '`') window.location.replace('https://classroom.google.com');
};
