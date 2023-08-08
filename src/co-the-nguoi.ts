import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import {isChineseCharacter, removeWs, trim} from "./util";

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './data/co-the-nguoi.json');
let data = {};

(async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://khoahoctiengtrung.com/bo-phan-co-the-nguoi-tieng-trung/', {
        waitUntil: 'domcontentloaded',
    });
    const $ = cheerio.load(await page.content());

    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath)
        const jsonData = JSON.parse(rawData)
        data = {...data, ...jsonData}
    }

    const trList = $('.site-main table tr')

    for (let tr of trList) {
        const tdList = $(tr).find('td')
        let cn = "";
        let vn = "";
        if (tdList.length === 4) {
            cn = trim($(tdList[1]).text())
            cn = removeWs(cn)

            vn = trim($(tdList[3]).text())
        }
        else {
            cn = $(tdList[1]).text().trim()
            cn = removeWs(cn)

            vn = $(tdList[0]).text().trim()
        }

        if (cn && vn && isChineseCharacter(cn) && cn.length >= 1 && cn.length <= 6) {
            data[cn] = vn
        }
    }

    console.log(data)

    fs.writeFile(filePath, JSON.stringify(data), function(error) {
        if (error) {
            throw error
        }
        console.log("Saved")
    })

    await browser.close();
})();
