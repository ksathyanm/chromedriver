const installer = require("./src/installer.js");

(async () => {
  await installer.findChromeDriverVersion()
})()
