const puppeteerutils = require('./puppeteer-utils');
const interviewConstants = require('./interview-constants.js');

const setup = async () => {
  let {page, browser} = await puppeteerutils.login();
  try {
    await puppeteerutils.createProject(page);
    await puppeteerutils.installRepo(page);
    await waitForPage(page);
  }
  catch (e) {
    console.log(e);
  }
  finally {
    browser.close();
  }
};

const takedown = async () => {
  let {page, browser} = await puppeteerutils.login();
  try {
    await puppeteerutils.deleteProject(page);
  }
  catch (e) {
    console.log(e);
  }
  finally {
    browser.close();
  }
};

const waitForPage = async (page) => {
  const tries = 20;
  for (i=0; i<tries; i++) {
    await page.goto(interviewConstants.PETITIONER_URL);
    const element = await page.$('#daMainQuestion');
    if (element) {
      console.log("found question on page");
      break;
    } else {
      console.log("question not found");
      page.waitFor(10 * 1000); // 10 seconds
    }
  }
};


module.exports = {setup, takedown};
