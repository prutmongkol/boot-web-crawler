import { JSDOM } from "jsdom";

function normalizeURL(url) {
    const urlObj = new URL(url);
    const normalizedURL = urlObj.hostname + urlObj.pathname;
    return normalizedURL.endsWith("/")
        ? normalizedURL.slice(0, -1)
        : normalizedURL;
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

async function fetchPage(url) {
    let res;
    try {
        res = await fetch(url);
    } catch (error) {
        console.log(error.message);
    }

    if (res.status >= 400) {
        console.log(`HTTP error: ${res.status} ${res.statusText}`);
        return;
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType || !contentType.includes("text/html")) {
        console.log(`Invalid content type: ${contentType}`);
        return;
    }

    return await res.text();
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    // bail if this is an offsite url
    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);
    if (baseURLObject.origin !== currentURLObject.origin) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);

    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`crawling ${currentURL}`);
    let html = "";
    try {
        html = await fetchPage(currentURL);
    } catch (error) {
        console.log(`${error.message}`);
        return pages;
    }

    const urls = getURLsFromHTML(html, baseURL);
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
