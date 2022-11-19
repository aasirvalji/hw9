const puppeteer = require('puppeteer');

/**
 * returns top 3 urls from amazon.ca based on a text input
 * @param {String} textInput 
 */
const getAmazonResults = async textInput => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.on('console', msg => console.log(msg.text()));

    await page.goto("https://www.amazon.ca");

    // Type into search box.
    const searchBarSelector = '.nav-input';
    await page.waitForSelector(searchBarSelector);
    await page.type(searchBarSelector, textInput);

    // click amazon search
    const searchButtonSelector = '.nav-search-submit';
    await page.waitForSelector(searchButtonSelector);
    await Promise.all([
        page.click(searchButtonSelector),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // Wait for the results page to load and display the results.
    const resultsSelector = '.s-product-image-container';
    await page.waitForSelector(resultsSelector);

    // Extract the results from the page.
    const links = await page.evaluate(() => {
        return [...document.querySelectorAll("h2")]
            .filter(r => r.querySelector('a')) // has anchor element?
            .map(r => {
                return "https://www.amazon.ca" + r.querySelector('a').getAttribute("href")
            }) // get href element
    });
    await browser.close();
    console.log(links.slice(0, 3));
};

module.exports = {
    getAmazonResults
}