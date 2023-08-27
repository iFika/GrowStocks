const puppeteer = require('puppeteer-extra').default
const axios = require("axios").default;
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
})
main()
async function main() {
console.log(`Scrape Item GrowStocks
Github : https://github.com/ifika (iFika)`)
rl.question(`Name Item > `, async(data) => {
let result = await ScrapeItem(data)
console.log(result)
})
}
async function ScrapeItem(itemName){
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
     puppeteer.use(StealthPlugin())
  console.log(`[SCRAPPER-GS] : Searching Suggestion Item...`)
    let item = (await axios.get(`https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=${itemName}`)).data
     itemName = item?.items[0]?.title
    if(itemName?.length < 1 || itemName == undefined || itemName == null) 
    {
        return "Item not on Suggestion! Catching."
    }
  console.log(`[SCRAPPER-GS] : Found! ${itemName}!`)
  console.log(`[SCRAPPER-GS] : Opening Chromium...`)
        const browser = await puppeteer.launch({ headless: false}); // for test disable the headlels mode,
        const page = await browser.newPage();
        
        await page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 3000 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        await page.goto(`https://growstocks.xyz/item/${itemName}`,{waitUntil: 'networkidle2'});
         console.log(`[SCRAPPER-GS] : Scrapping...`)
        /** @type {string[]} */
          let lmao = await page.evaluate(()=>{
            const rateRegex = /Rate: ([+-]?\d+(\.\d+)?%)/;
            var div = document.getElementsByClassName('price');
            
            return {
                price: div[0]?.textContent
             } // console.log inside evaluate, will show on browser console not on node console
          })  
browser.close()
  console.log(`[SCRAPPER-GS] : Completed! (c) 2023 iFika`)
  return lmao;
}
