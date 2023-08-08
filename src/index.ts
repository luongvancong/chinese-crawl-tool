import puppeteer from 'puppeteer';


(async () => {
    const rules: any = {
        "https://khoahoctiengtrung.com/cac-loai-benh-tieng-trung/": {
            type: "benh-tat",
            selectors: {
                listItem: "#post-12808 > div > div > table:nth-child(8) tr",

            }
        }
    }

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://khoahoctiengtrung.com/cac-loai-benh-tieng-trung/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
        'title'
    );
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    const data = await page.evaluate(() => {
        const trList = document.querySelectorAll('#post-12808 > div > div > table:nth-child(8) tr')
        const data = []
        for (let tr of trList) {
            const tdList = tr.querySelectorAll('td')
            data.push({
                cn: tdList[1].textContent,
                vn: tdList[0].textContent
            })
        }
        return data
    })

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);
    console.log(data)

    await browser.close();
})();
