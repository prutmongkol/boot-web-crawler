import { JSDOM } from "jsdom";

function normalizeURL(url) {
    const urlObj = new URL(url);
    const normalizedURL = urlObj.hostname + urlObj.pathname;
    return normalizedURL.endsWith("/") ? normalizedURL.slice(0, -1) : normalizedURL;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll("a");
    for (const anchor of anchors) {
        if (anchor.hasAttribute("href")) {
            let href = anchor.getAttribute("href");
            try {
                href = new URL(href, baseURL).href;
                urls.push(href);
            } catch (error) {
                console.log(`${error.message}: ${href}`);

            }
        }
    }
    return urls;
}

export { normalizeURL, getURLsFromHTML };