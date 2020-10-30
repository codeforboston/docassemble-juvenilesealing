const { When, Then, And, Given, After, AfterAll, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');
const interviewConstants = require('../../interview-constants');
const scope = require('./scope');

const PETITIONER_URL = interviewConstants.PETITIONER_URL;
const CLINIC_URL = interviewConstants.CLINIC_URL;
setDefaultTimeout(120 * 1000);

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

Given(/I start the (petitioner|clinic) interview/, async (interview) => {
  // If there is no browser open, start a new one
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless: !process.env.DEBUG });
  }
  if (!scope.page) {
    scope.page = await scope.browser.newPage();
    scope.page.setDefaultTimeout(120 * 1000);
    // PDFs should get downloaded
    await scope.page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: '.',
    });
  }

  const url = interview === 'petitioner' ? PETITIONER_URL : CLINIC_URL
  // Then go to the given page
  await scope.page.goto(url, {waitUntil: 'domcontentloaded'});
});

When(/I wait (\d+) seconds?/, async (seconds) => {
  await scope.page.waitFor(seconds * 1000);
});


async function findElemByText(elem, text) {
  await scope.page.waitForNavigation({waitUntil: 'domcontentloaded'});
  const elems = await scope.page.$$(elem);
  for (var i=0; i < elems.length; i++) {
    let elemText = await (await elems[i].getProperty('innerText')).jsonValue();
    if (elemText.includes(text)) {
      return elems[i];
    }
  }
  return null;
}

When(/I click the (button|link) "([^"]+)"/, async (elemType, phrase) => {
  let elem;
  if (elemType === 'button') {
    [elem] = await scope.page.$x(`//button/span[contains(text(), "${phrase}")]`);
  } else {
    [elem] = await scope.page.$x(`//a//*[contains(text(), "${phrase}")]`);
  }

  if (elem) {
    await Promise.all([
      elem.click(),
      scope.page.waitForNavigation({waitUntil: 'domcontentloaded'})
    ]);
  } else {
    if (process.env.DEBUG) {
      await scope.page.screenshot({ path: './error.jpg', type: 'jpeg', fullPage: true });
    }
    throw `No ${elemType} with text ${phrase} exists.`;
  }
});

When('I click the defined text link {string}', async (phrase) => {
  const [link] = await scope.page.$x(`//a[contains(text(), "${phrase}")]`);
  if (link) {
    await link.click();
  } else {
    if (process.env.DEBUG) {
      await scope.page.screenshot({ path: './error.jpg', type: 'jpeg', fullPage: true });
    }
    throw `No link with text ${phrase} exists.`;
  }
});

Then('I should see the phrase {string}', async (phrase) => {
  const bodyText = await scope.page.$eval('body', elem => elem.innerText);
  expect(bodyText).to.contain(phrase);
});

After(async (scenario) => {
  if (scenario.result.status === "failed") {
    const name = scenario.pickle.name.replace(/[^A-Za-z0-9]/gi, '');
    await scope.page.screenshot({ path: `error-${name}.jpg`, type: 'jpeg', fullPage: true });
  }
  // If there is a browser window open, then close it
  if (scope.page) {
    await scope.page.close();
    scope.page = null;
  }
});

AfterAll(async () => {
  // If there is a browser open, then close it
  if (scope.browser) {
    await scope.browser.close();
  }
});
