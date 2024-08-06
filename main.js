import { argv } from "process";

function main() {
    if (argv.length < 3) {
        console.log("Need a url argument.\nUsage: node main.js <baseURL>");
        return;        
    }
    if (argv.length > 3) {
        console.log("Too many arguments\nUsage: node main.js <baseURL>");
        return;
    }

    const baseURL = argv[2];
    console.log(`Crawler is starting at the following base URL: ${baseURL}`);    
}

main()