const chai = require('chai');
const puppeteer = require('puppeteer');
const puppeteerutils = require('./puppeteer-utils');

// Tell Chai that we want to use the expect syntax
const expect = chai.expect;

// useful cheat sheet for assertions: https://devhints.io/chai
// run tests with "npm run test"

describe('Making sure we can log into Docassemble playground', () => {
  it('login and get to the interviews page', async () => {
    let {page, browser} = await puppeteerutils.login();
    expect(page).to.exist;
    expect(browser).to.exist;
    expect(page.url()).to.include('/interviews');
    const bodyText = await page.$eval('body', elem => elem.textContent);
    expect(bodyText).to.have.string('You have signed in successfully.');
    await browser.close();
  });
});