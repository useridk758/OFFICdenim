if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/uv/uv.sw.js', { scope: __uv$config.prefix });
}

const home = document.getElementById('home-screen');
const browser = document.getElementById('browser-screen');
const frame = document.getElementById('content-frame');
const input = document.getElementById('url-input');

document.getElementById('go-btn').onclick = () => {
    let url = input.value.trim();
    
    // 1. Check if it's a search or a direct link
    if (!url.includes('.')) {
        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
        url = 'https://' + url;
    }

    // 2. Encode it for the proxy engine
    const proxiedURL = __uv$config.prefix + __uv$config.encodeUrl(url);

    // 3. Show the frame and load the site
    frame.src = proxiedURL;
    home.style.display = 'none';
    browser.style.display = 'block';
};

// EXIT BUTTON
document.getElementById('exit-btn').onclick = () => {
    frame.src = 'about:blank'; // Stop the site
    browser.style.display = 'none';
    home.style.display = 'flex';
};
