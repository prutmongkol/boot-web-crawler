function sortPages(pages) {
    let pagesArray = [];
    for (const key in pages) {
        if (Object.hasOwn(pages, key)) {
            const element = pages[key];
            pagesArray.push({
                pageURL: key,
                count: element,
            })
        }
    }
    pagesArray.sort((a,b) => {
        // Larger count first
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;

        // if counts are equal, sort by pageURL alphabetically
        return a.pageURL.localeCompare(b.pageURL);
    })
    return pagesArray
}

function printReport(pages) {
    console.log('==========');
    console.log('  REPORT  ');
    console.log('==========');
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        console.log(`Found ${page.count} internal link(s) to ${page.pageURL}`);
    }
}

export { sortPages, printReport }