# Sealing Juvenile Records

This process should be easier for both petitioners themselves and
legal professionals who hope to support petitioners. This tool
is focused on MA.

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

### Cucumber tests

To get these tests to run on your local development machine (e.g., your laptop), make sure you have NPM installed.

The first time you run these tests, type `npm install` into your terminal. This will install the packages required for testing.

To run the tests, type `npm run local` into your terminal.

To run a single test:
```
npm run setup
./node_modules/.bin/cucumber-js --require ./node_modules/docassemble-cucumber/lib/index.js tests/features/TEST_NAME.feature
npm run takedown
```
