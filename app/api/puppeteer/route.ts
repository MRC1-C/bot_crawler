import { NextResponse } from "next/server";
import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import Recaptcha from "puppeteer-extra-plugin-recaptcha";
import chromium from '@sparticuz/chromium'
import axios from "axios";
import client from "../../prismadb";


puppeteer.use(stealthPlugin())
puppeteer.use(Recaptcha())



function delay(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json(
            { error: "URL parameter is required" },
            { status: 400 }
        );
    }
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            args: [
                ...chromium.args,
                '--no-sandbox',
                '--window-size=1028,800'
            ],
            ignoreHTTPSErrors: true,
        });
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
        const page = await browser.newPage();
        await page.setUserAgent(ua);

        await page.goto(url, {
            waitUntil: "domcontentloaded",
        });
        await delay(1000)

        const screenshot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1028, height: 2000 } });

        const formData = new FormData();
        const screenshotBlob = new Blob([screenshot], { type: 'image/png' });

        formData.append('file', screenshotBlob, 'screenshot.png');

        // Make a POST request to the Flask server
        const response = await axios.post('http://127.0.0.1:5000/resnet', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response)
        if (response.data.result == 0) {
            const allTextContent = await page.$$eval('*', elements => {
                return elements.map((element: any) => element?.textContent?.trim()).join('\n');
            });

            const res = await axios.post('http://127.0.0.1:5000/process_data', {
                text: allTextContent
            });
            client.data.create({
                data: {
                    data: res.data.result
                }
            })
                .then(data => console.log(data))
                .catch(err => console.log(err))
            return NextResponse.json({ result: res.data.result });
        }
        else {
            return NextResponse.json('Ảnh không phải là detail');
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: error.toString() },
            { status: 500 }
        );
    } finally {

        if (browser) {
            await browser.close();
        }
    }
}