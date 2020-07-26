const { When, Then, And, Given, AfterAll } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const interviewConstants = require('../../interview-constants');
const scope = require('./scope');

const PETITIONER_URL = interviewConstants.PETITIONER_URL;
const CLINIC_URL = interviewConstants.CLINIC_URL;

// -- From tutorial

Given('a variable set to {int}', function(number) {
  this.setTo(number);
});

When('I increment the variable by {int}', function(number) {
  this.incrementBy(number);
});

Then('the variable should contain {int}', function(number) {
  expect(this.variable).to.eql(number);
});

// chercher puppeteer tutorial
Given('The browser is open', async function(){
    this.browser = await puppeteer.launch({headless:false})
    this.page = await this.browser.newPage();
})

When('open the Google page', async function () {
    await this.page.goto("https://google.com")
});

When('search for chercher tech', async function () {
    await this.page.waitForSelector("[name='q']")
    await this.page.type("[name='q']", "chercher tech")
    await this.page.click("[name='btnK']")
});

Then('Count the results', async function () {
    var linkTexts = await this.page.$$eval(".plan-features a",
                elements=> elements.map(item=>item.textContent))
    // prints a array of text
    console.log(linkTexts.length)

    //uncomment close statement if you want
    //await this.browser.close()
});


// -- Puppeteer specific steps from hello_world.feature

Given(/I start the petitioner interview/, async () => {
  // If there is no browser open, start a new one
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless: !process.env.DEBUG });
    scope.page = await scope.browser.newPage();
  }
  // Then go to the given page
  await scope.page.goto(PETITIONER_URL, {waitUntil: 'domcontentloaded'});
});

When(/I wait (\d+) seconds?/, async (seconds) => {
  await scope.page.waitFor(seconds * 1000);
});

Then(/I should see the phrase "([^"]+)"/, async (phrase) => {
  const bodyText = await scope.page.$eval('body', elem => elem.innerText);
  expect(bodyText).to.contain(phrase);
});

async function findElemByText(elem, text) {
  await scope.page.waitForNavigation({
    waitUntil: 'networkidle0',
  });
  const elems = await scope.page.$$(elem);
  for (var i=0; i < elems.length; i++) {
    let elemText = await (await elems[i].getProperty('innerText')).jsonValue();
    if (elemText.includes(text)) {
      return elems[i];
    }
  }
  return null;
}

Then(/I click the button "([^"]+)"/, async (phrase) => {
  const button = await findElemByText('button', phrase);
  if (button) {
    button.click();
  } else {
    if (process.env.DEBUG) {
      await scope.page.screenshot({ path: './error.jpg', type: 'jpeg' });
    }
    throw `No button with text ${phrase} exists.`;
  }
});

Then(/I click the link "([^"]+)"/, async (phrase) => {
  const link = await findElemByText('a', phrase);
  if (link) {
    link.click();
  } else {
    if (process.env.DEBUG) {
      await scope.page.screenshot({ path: './error.jpg', type: 'jpeg' });
    }
    throw `No link with text ${phrase} exists.`;
  }
});

AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) await scope.browser.close();
});