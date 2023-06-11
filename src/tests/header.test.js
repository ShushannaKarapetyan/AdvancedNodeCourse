const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

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

test.only('when signed in, shows logout button', async () => {
    const user = await userFactory();

    const {session, sig} = sessionFactory(user);
    await page.setCookie({name: 'session', value: session});
    await page.setCookie({name: 'session.sig', value: sig});
    await page.goto('localhost:3000');

    const element = 'a[href="/auth/logout"]';
    await page.waitFor(element);
    const text = await page.$eval(element, el => el.innerHTML);

    expect(text).toEqual('Logout');
});
