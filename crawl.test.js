import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

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