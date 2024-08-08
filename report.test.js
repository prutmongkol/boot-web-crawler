import { test, expect } from "@jest/globals";
import { sortPages } from "./report";
// {
//     'wagslane.dev': 63,
//     'wagslane.dev/tags': 62,
//     'wagslane.dev/about': 62,
//     'wagslane.dev/index.xml': 62,
//     'wagslane.dev/tags/business': 1,
//     'wagslane.dev/posts/dark-patterns': 2,
//   }
test("sortPages", () => {
    const inputPages = {
        "wagslane.dev": 63,
        "wagslane.dev/tags": 62,
        "wagslane.dev/about": 62,
        "wagslane.dev/index.xml": 62,
        "wagslane.dev/tags/business": 1,
        "wagslane.dev/posts/dark-patterns": 2,
    };
    const actual = sortPages(inputPages);
    const expected = [
        {count: 63, pageURL: "wagslane.dev"},
        {count: 62, pageURL: "wagslane.dev/about"},
        {count: 62, pageURL: "wagslane.dev/index.xml"},
        {count: 62, pageURL: "wagslane.dev/tags"},
        {count: 2, pageURL: "wagslane.dev/posts/dark-patterns"},
        {count: 1, pageURL: "wagslane.dev/tags/business"},
    ];
    expect(actual).toEqual(expected);
});
