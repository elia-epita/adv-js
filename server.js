require("dotenv").config();
const startApp = require("./boot/setup").startApp;

(() => {
  try {
    startApp();
  } catch (error) {
    console.log("Error in server.js => startApp");
  }
})();
