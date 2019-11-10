// The first time you run the tests,
// use `npm install` to set up the testing framework.
// Run using `node tests/hello_world.js`.

const puppeteer = require('puppeteer');

INTERVIEW_PAGE = "https://interviews-dev.gbls.org/interview?i=docassemble.playground42:juvenile-sealing-intro-9.yml"

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(INTERVIEW_PAGE);

  const heading = await page.$('#daMainQuestion');
  let heading_text = await (await heading.getProperty('innerText')).jsonValue();
  if (heading_text.toLowerCase() == 'CAN YOU SEAL YOUR MASSACHUSETTS JUVENILE RECORDS?'.toLowerCase()) {
      console.log("Successful Test");
  } else {
      console.log("Unsuccessful Test.");
  }

  browser.close();
}

run();