import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import {isChineseCharacter, removeWs, trim} from "./util";

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './data/benh-tat.json');
let data = {};

(async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://khoahoctiengtrung.com/cac-loai-benh-tieng-trung', {
        waitUntil: 'domcontentloaded',
    });
    const $ = cheerio.load(await page.content());

    const trList = $('#post-12808 > div > div > table:nth-child(8) tr')

    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath)
        data = JSON.parse(rawData)
    }

    for (let tr of trList) {
        const tdList = $(tr).find('td')
        let cn = $(tdList[1]).text()
        cn = trim(cn)
        cn = removeWs(cn)

        let vn = $(tdList[0]).text()
        vn = trim(vn)

        if (cn && vn && isChineseCharacter(cn) && cn.length >= 2 && cn.length <= 6) {
            data[cn] = vn
        }
    }

    fs.writeFile(filePath, JSON.stringify(data) , function(error) {
        if (error) {
            throw error
        }
        console.log("Saved")
    })

    await browser.close();
})();
