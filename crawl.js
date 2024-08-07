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

async function crawlPage(currentURL) {
    console.log(`Crawling ${currentURL}`);

    let response;
    try {
        response = await fetch(currentURL);
    } catch (error) {
        console.log(error.message);
    }

    if (response.status >= 400) {
        console.log(`HTTP error: ${response.status} ${response.statusText}`);
        return;
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("text/html")) {
        console.log(`Invalid content type: ${contentType}`);
        return;
    }

    console.log(await response.text());
}

export { normalizeURL, getURLsFromHTML, crawlPage };
