const puppeteer = require('puppeteer');
require('dotenv').config();

const login = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Login
  await page.goto('https://interviews-dev.gbls.org/user/sign-in?');
  const emailElement = await page.$('#email');
  console.log(process.env.PLAYGROUND_EMAIL)
  await emailElement.type(process.env.PLAYGROUND_EMAIL);
  const passwordElement = await page.$('#password');
  await passwordElement.type(process.env.PLAYGROUND_PASSWORD);
  await Promise.all([
    passwordElement.press('Enter'),
    page.waitForNavigation(),
  ]);
  return {'page': page, 'browser': browser};
};

const navigateToManageProject = async (page) => {
  // Go to playground
  await page.goto('https://interviews-dev.gbls.org/playground');
  // Click dropdown in top left corner
  const dropdown = await page.$('#dropdownMenuButton');
  await dropdown.click();
  const dropdownOptions = await page.$$('[aria-labelledby="dropdownMenuButton"] .dropdown-item');
  // Click Manage Projects button
  const manageProjectsButton = dropdownOptions[dropdownOptions.length - 1];
  await Promise.all([
    manageProjectsButton.click(),
    page.waitForNavigation(),
  ]);
};

const createProject = async (projectName) => {
  try {
    let {page, browser} = await login();
    await navigateToManageProject(page);
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
    await browser.close();
  }
  catch (e) {
    console.log('An error happened in createProject. Details below:');
    console.log(e);
  }
};

const deleteProject = async (projectName) => {
  try {
    let {page, browser} = await login();
    await navigateToManageProject(page);
    // Click Delete button
    const deleteLink = '[href="/playgroundproject?delete=1&project=' + projectName + '"]';
    const deleteButton = await page.$(deleteLink);
    if (!deleteLink) {
      console.log('No such project exists');
      return;
    }
    await Promise.all([
      deleteButton.click(),
      page.waitForNavigation(),
    ]);
    // Click Delete button again
    const deleteButton2 = await page.$('[type="submit"]');
    await Promise.all([
      deleteButton2.click(),
      page.waitForNavigation(),
    ]);
    await browser.close();
  }
  catch (e) {
    console.log('An error happened in deleteProject. Details below:');
    console.log(e);
  }
}

// createProject('testing');
// deleteProject('testing');

module.exports = {
  login: login,
  createProject: createProject,
  deleteProject: deleteProject,
}