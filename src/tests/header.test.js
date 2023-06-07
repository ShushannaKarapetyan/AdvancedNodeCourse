require('dotenv').config();
const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });

    page = await browser.newPage();

    await page.goto('localhost:3000');
});

afterEach(async () => {
    await browser.close();
})

test('the header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
    await page.click('.right a');

    const url = page.url();

    expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, shows logout button', async () => {
    const id = '644505ed6bf6ad2a405ddc3b';

    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    };

    const sessionString = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString('base64');

    const Keygrip = require('keygrip');
    const keys = require("../../config/keys");
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);

    await page.setCookie({name: 'session', value: sessionString});
    await page.setCookie({name: 'session.sig', value: sig});
    await page.goto('localhost:3000');

    const element = 'a[href="/auth/logout"]';
    await page.waitFor(element);
    const text = await page.$eval(element, el => el.innerHTML);

    expect(text).toEqual('Logout');
});
