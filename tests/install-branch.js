const puppeteerutils = require('./puppeteer-utils');

const setup = async () => {
  let {page, browser} = await puppeteerutils.login();
  try {
    await puppeteerutils.createProject(page);
    await puppeteerutils.installRepo(page);
  }
  catch (e) {
    console.log(e);
  }
  finally {
    browser.close();
  }
};

try {
  setup();
}
catch (e) {
  console.log(e);
}

