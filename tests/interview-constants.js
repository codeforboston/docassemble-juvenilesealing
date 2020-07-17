const putils = require('./puppeteer-utils');

const PETITIONER_URL = `${putils.BASE_INTERVIEW_URL}%3Aentrypoint-petitioner.yml#page1`;
const CLINIC_URL = `${putils.BASE_INTERVIEW_URL}%3Aentrypoint-clinic.yml#page1`;


module.exports = {
  PETITIONER_URL,
  CLINIC_URL,
};
