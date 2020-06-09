const puppeteer = require('puppeteer');
require('dotenv').config();

const BASE_URL = 'https://interviews-dev.gbls.org';
const PLAYGROUND_URL = `${BASE_URL}/playground`;
const DEBUG = true;

const login = async () => {
  const browser = await puppeteer.launch({headless: !DEBUG});
  const page = await browser.newPage();
  // Login
  await page.goto('https://interviews-dev.gbls.org/user/sign-in?');
  const emailElement = await page.$('#email');
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

const installRepo = async (page, projectName, repoUrl, branchName) => {
  await page.goto(`${BASE_URL}/pullplaygroundpackage?project=${projectName}&github=${repoUrl}&branch=${branchName}`);
  const pullButton = await page.$('button[name=pull]');
  await Promise.all([
    pullButton.click(),
    page.waitForNavigation(),
  ]);
  const installButton = await page.$('button[name=install]');
  await Promise.all([
    installButton.click(),
    page.waitForNavigation(),
  ]);
}

const workflow = async () => {
  projectName = 'test20200531';
  repoUrl = 'https://github.com/knod/docassemble-juvenilesealing';
  branchName = 'jest-assertions';
  let {page, browser} = await login();
  try {
    await installRepo(page, projectName, repoUrl, branchName);
  }
  catch (e) {
    console.log(e);
  }
}
workflow();
// createProject('testing');
// deleteProject('testing');

module.exports = {
  login: login,
  createProject: createProject,
  deleteProject: deleteProject,
}

