import puppeteer from "puppeteer"; // 1

let browser;
let page;
jest.setTimeout(900000)
// 2
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 250
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

// 3
test("search results should be 4", async () => {
  await page.waitForSelector(".Container-fluid");
  await page.type('#search', 'ac');
  const listItems = await page.$$eval('.col-md-4', col => col.length)
  expect(listItems).toBe(4);
});

test("search results should be 2", async () => {
  const input = await page.$('#search');
  await input.click({ clickCount: 3 })
  await input.type("");
  await page.waitForSelector(".Container-fluid");
  await page.type('#search', 'acc');
  const listItems = await page.$$eval('.col-md-4', col => col.length)
  expect(listItems).toBe(2);

});

test("search results should be 0", async () => {
  const input = await page.$('#search');
  await input.click({ clickCount: 3 })
  await input.type("");
  await page.waitForSelector(".Container-fluid");
  await page.type('#search', 'acc1');
  const listItems = await page.$$eval('.col-md-4', col => col.length)
  expect(listItems).toBe(0);
});

// 4
afterAll(() => {
  browser.close();
});