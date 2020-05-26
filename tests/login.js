const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const login = async () => {
  const result = dotenv.config().parsed;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Login
  await page.goto('https://interviews-dev.gbls.org/user/sign-in?');
  const emailElement = await page.$('#email');
  await emailElement.type(result.PLAYGROUND_EMAIL);
  const passwordElement = await page.$('#password');
  await passwordElement.type(result.PLAYGROUND_PASSWORD);
  await Promise.all([
    passwordElement.press('Enter'),
    page.waitForNavigation(),
  ]);
  return {'page': page, 'browser': browser};
};

const createProject = async (projectName) => {
  let {page, browser} = await login();
  // Go to playground
  await page.goto('https://interviews-dev.gbls.org/playground');
  // Click dropdown in top left corner
  const dropdown = await page.$('#dropdownMenuButton');
  await dropdown.click();
  const dropdownOptions = await page.$$('[aria-labelledby="dropdownMenuButton"] .dropdown-item');
  // Click Manage Projects button
  const manageProjectsButton = dropdownOptions[1];
  await Promise.all([
    manageProjectsButton.click(),
    page.waitForNavigation(),
  ]);
  // Click "Add a new project"
  const addNewProjectButton = await page.$('.fa-plus-circle');
  await Promise.all([
    addNewProjectButton.click(),
    page.waitForNavigation(),
  ]);
  // Enter new project name
  const projectNameElement = await page.$('#name');
  await projectNameElement.type(projectName);
  // Click Save
  const saveButton = await page.$('[type="submit"]');
  await Promise.all([
    saveButton.click(),
    page.waitForNavigation(),
  ]);
  await page.screenshot({path: 'example.png'});
  await browser.close();
};

createProject('testing2');