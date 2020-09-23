# Sealing Juvenile Records

This process should be easier for both petitioners themselves and
legal professionals who hope to support petitioners. This tool
is focused on MA

## Design

### MVP should include

1. Expectation setting.
1. Links to support we cannot provide.
1. Mobile friendly UI.
1. A printable PDF.

### Interview steps

1. Check for immigration status **separately from the main interview**
1. Screen for legal professionals
1. Link to get certified dockets
1. Sealing eligibility questions
1. Personal details questions
1. Downloadable/printable pre-filled petition PDF
1. Provide the address for mailing the petition

## Users

### Target Audiences

1. Petitioners.
1. Legal professionals or clinic volunteers.

### Unresovled Petitioner Barriers

1. Frustration and distrust of the process.
1. No access to printers.
1. Which vocabulary will they find familiar?

**User research needs to play a large role in the design of this tool.**

This tool is made with [Docassemble](https://github.com/jhpyle/docassemble).

## Testing

### Chai/Puppeteer tests

The first time you clone this repo, make sure you have NPM installed and run `npm install`.
This will install the libraries required for testing.

To run the tests, run `npm run test`.

### Aloe/Lettuce tests

To get these tests to run, you need to download chromedriver from https://sites.google.com/a/chromium.org/chromedriver/ and put it in `tests/`
You also need to `pip3 install aloe selenium certifi`

To run [a feature test](https://docassemble.org/docs/development.html#bdd):
```
cd tests
aloe features/hello_world.feature
```
