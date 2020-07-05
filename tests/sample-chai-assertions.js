const chai = require('chai');
const putils = require('./puppeteer-utils');

// Tell Chai that we want to use the expect syntax
const expect = chai.expect;

// useful cheat sheet for assertions: https://devhints.io/chai
// run tests with "npm run test"

const PETITIONER_URL = `${putils.BASE_INTERVIEW_URL}%3Aentrypoint-petitioner.yml#page1`;
const CLINIC_URL = `${putils.BASE_INTERVIEW_URL}%3Aentrypoint-clinic.yml#page1`;


describe('Making sure we can log into Docassemble playground', () => {
  it('login and get to the interviews page', async () => {
    let {page, browser} = await putils.login();
    expect(page).to.exist;
    expect(browser).to.exist;
    expect(page.url()).to.include('/interviews');
    const bodyText = await page.$eval('body', elem => elem.textContent);
    expect(bodyText).to.have.string('You have signed in successfully.');
    await browser.close();
  });
});



describe('Petitioner interview', () => {
  let page, browser;
  before(async () => {
    ({page, browser} = await putils.initPuppeteer());
  });

  after((done) => {
    browser.close();
    done();
  });

  it('opens the petitioner interview', async () => {
    let resp = await page.goto(PETITIONER_URL);
    const mainQuestion = await page.$eval('#daMainQuestion', e => e.innerText);
    expect(mainQuestion.toLowerCase()).to.contain("can you seal your massachusetts juvenile records?", "First page title question");
  });
});
