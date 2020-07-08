const puppeteer = require('puppeteer');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const BRANCH_NAME = process.env.BRANCH_NAME
    || (process.env.BRANCH_PATH && process.env.BRANCH_PATH.split('/')[2])
    || 'master';
const PROJECT_NAME = ('testing' + BRANCH_NAME).replace(/[^A-Za-z0-9]/gi, '');
const BASE_INTERVIEW_URL = `${BASE_URL}/interview?i=docassemble.playground${process.env.PLAYGROUND_ID}${PROJECT_NAME}`;

const initPuppeteer = async () => {
  const browser = await puppeteer.launch({headless: !process.env.DEBUG});
  const page = await browser.newPage();
  return {'page': page, 'browser': browser};
}

const login = async () => {
  const {page, browser} = await initPuppeteer();
  // Login
  await page.goto(`${BASE_URL}/user/sign-in?`);
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
  await page.goto(`${BASE_URL}/playground`, {waitUntil: 'domcontentloaded'});
  // Click dropdown in top left corner
  const dropdown = await page.$('#dropdownMenuButton');
  await dropdown.click();
  const dropdownOptions = await page.$$('[aria-labelledby="dropdownMenuButton"] .dropdown-item');
  // Click Manage Projects button
  const manageProjectsButton = dropdownOptions[dropdownOptions.length - 1];
  console.log(manageProjectsButton);
  await manageProjectsButton.click();
  await page.waitForNavigation();
  // await Promise.all([
  //   manageProjectsButton.click(),
  //   page.waitForNavigation(),
  // ]);
};

const createProject = async (page) => {
  try {
    await navigateToManageProject(page);
    // Check if a project with this name already exists
    const projectLink = `[href="/playground?project=${PROJECT_NAME}"]`;
    const projectButton = await page.$(projectLink);
    if (projectButton) {
      return;
    }
    // Click "Add a new project"
    const addNewProjectButton = await page.$('.fa-plus-circle');
    await Promise.all([
      addNewProjectButton.click(),
      page.waitForNavigation(),
    ]);
    // Enter new project name
    const projectNameElement = await page.$('#name');
    await projectNameElement.type(PROJECT_NAME);
    // Click Save
    const saveButton = await page.$('[type="submit"]');
    await Promise.all([
      saveButton.click(),
      page.waitForNavigation(),
    ]);
  }
  catch (e) {
    console.log('An error happened in createProject. Details below:');
    console.log(e);
  }
};

const deleteProject = async (page) => {
  try {
    await navigateToManageProject(page);
    // Click Delete button
    const deleteLink = `[href="/playgroundproject?delete=1&project=${PROJECT_NAME}"]`;
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
  }
  catch (e) {
    console.log('An error happened in deleteProject. Details below:');
    console.log(e);
  }
};

const installUrl = () => `${BASE_URL}/pullplaygroundpackage?${urlParams(
  {
    project: PROJECT_NAME,
    github: process.env.REPO_URL,
    branch: BRANCH_NAME,
  }
)}`;

const urlParams = (params) => urlString = Object.keys(params).map(
  (key) => `${key}=${params[key]}`
).join('&')

const installRepo = async (page) => {
  await page.goto(installUrl());
  const pullButton = await page.$('button[name=pull]');
  await Promise.all([
    pullButton.click(),
    page.waitForNavigation({
      // Without this, it tries to find the installButton before navigation is over
      waitUntil: 'networkidle0',
    }),
  ]);
  const installButton = await page.$('button[name=install]');
  await Promise.all([
    installButton.click(),
    page.waitForNavigation(),
  ]);
  // installation can take a while, so set timeout to 300 seconds
  await page.waitForSelector('.alert-success', {timeout: 300000});
}

module.exports = {
  BASE_INTERVIEW_URL: BASE_INTERVIEW_URL,
  BRANCH_NAME: BRANCH_NAME,
  login: login,
  createProject: createProject,
  deleteProject: deleteProject,
  installRepo: installRepo,
  initPuppeteer: initPuppeteer,
};

