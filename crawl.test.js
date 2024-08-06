import { test, expect } from "@jest/globals";
import { 
    normalizeURL,
    getURLsFromHTML,
} from "./crawl.js";

test("normalizeURL", () => {
    expect(normalizeURL("https://www.example.com/path/")).toBe("www.example.com/path");
    expect(normalizeURL("https://www.example.com/path")).toBe("www.example.com/path");
    expect(normalizeURL("http://www.example.com/path/")).toBe("www.example.com/path");
    expect(normalizeURL("http://www.example.com/path")).toBe("www.example.com/path");
    expect(normalizeURL("https://www.example.com/")).toBe("www.example.com");
    expect(normalizeURL("http://www.example.com/")).toBe("www.example.com");
    expect(normalizeURL("https://example.com/path/")).toBe("example.com/path");
    expect(normalizeURL("http://example.com/path/")).toBe("example.com/path");
    expect(normalizeURL("https://www.example.com?query=string")).toBe("www.example.com");
    expect(normalizeURL("https://www.example.com?query=string&other=param")).toBe("www.example.com");
    expect(normalizeURL("https://www.example.com?query=string#hash")).toBe("www.example.com");
    expect(normalizeURL("https://www.EXAMPLE.com/path")).toBe("www.example.com/path");
    expect(normalizeURL("http://www.EXAMPLE.com/path")).toBe("www.example.com/path");
})

test("getURLsFromHTML absolute", () => {  
    const inputBody = '<html><body><a href="https://www.example.com"><span>Go to Example.com</span></a></body></html>';
    const inputURL = "https://www.example.com";
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ["https://www.example.com/"];
    expect(actual).toEqual(expected);
})

test("getURLsFromHTML relative", () => {
    const inputBody = '<html><body><a href="/path/"><span>Go to Example.com</span></a></body></html>';
    const inputURL = "https://www.example.com";
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ["https://www.example.com/path/"];
    expect(actual).toEqual(expected);
})

test("getURLsFromHTML both", () => {
    const inputBody = '<html><body><a href="/path/"><span>Go to Example.com</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
    const inputURL = "https://www.example.com";
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ["https://www.example.com/path/", "https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
})