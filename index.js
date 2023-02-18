const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const schedule = require('node-schedule');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function login(page) {
    try {
        await page.goto('https://mr-rmza.ir/login');
        const html = await page.content();
        const $ = await cheerio.load(html);
        await page.type('#email', 'mrrmza051@gmail.com');
        await page.type('#password', '09381560761');
        await page.click('body > div:nth-child(1) > div > div > div > div > div > div.card-body > form > div.row.mb-0 > div > button');
    } catch (error) {
        console.log(error);
    }
}

async function list(page) {
    try {
        await page.goto('https://mr-rmza.ir/admin/order');
        const html = await page.content();
        const $ = await cheerio.load(html);
        const table = $('table > tbody > tr > td').map((i, e) => {
            console.log($(e).text());
        });
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await login(page);
        await sleep(1000);
        await list(page);
    } catch (error) {
        console.log(error);
    }
}

main();