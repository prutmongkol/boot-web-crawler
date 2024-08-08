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
        if (res.status >= 400) {
            console.log(`HTTP error: ${res.status} ${res.statusText}`);
            return;
        }
        const contentType = res.headers.get("Content-Type");
        if (!contentType || !contentType.includes("text/html")) {
            console.log(`Invalid content type: ${contentType}`);
            return;
        }
    } catch (error) {
        console.log(error.message);
    }

    return await res.text();
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    console.log(`Crawling ${currentURL}`);

    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);

    if (baseURLObject.origin !== currentURLObject.origin) {
        console.log("\tUnmatched base url. Terminated.");
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);

    pages[normalizedCurrentURL] = (pages[normalizedCurrentURL] || 0) + 1;

    const html = await fetchPage(currentURL);
    const urls = getURLsFromHTML(html, baseURL);

    for (const url of urls) {
        if (Object.hasOwn(pages, normalizeURL(url))) {
            continue;
        }
        await crawlPage(baseURL, url, pages);
    }

    return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
