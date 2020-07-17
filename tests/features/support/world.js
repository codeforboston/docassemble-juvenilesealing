// const { setWorldConstructor } = require("cucumber");

// class CustomWorld {
//   constructor() {
//     this.variable = 0;
//   }

//   setTo(number) {
//     this.variable = number;
//   }

//   incrementBy(number) {
//     this.variable += number;
//   }
// }

// setWorldConstructor(CustomWorld);

const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./scope');

const World = function() {
  scope.driver = puppeteer;
  scope.context = {};
};

setWorldConstructor(World);