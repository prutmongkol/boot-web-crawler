function normalizeURL(url) {
    const urlObj = new URL(url);
    const normalizedURL = urlObj.hostname + urlObj.pathname;
    return normalizedURL.endsWith("/") ? normalizedURL.slice(0, -1) : normalizedURL;
}

export { normalizeURL };