const fetch = require("node-fetch")
const findChromeVersion = require("find-chrome-version")

// eslint-disable-next-line max-len
const cdnUrl = process.env.npm_config_chromedriver_cdnurl || process.env.CHROMEDRIVER_CDNURL || "https://chromedriver.storage.googleapis.com"
const normalizedCdnUrl = cdnUrl.replace(/\/+$/, "")

module.exports.findChromeDriverVersion = async () => {
  const chromeVersion = await findChromeVersion()
  console.log(`Your Chrome version is ${chromeVersion}`)

  const chromeVersionWithoutPatch = /(.*)[.]\d+/.exec(chromeVersion)[1]
  const response = await fetch(`${normalizedCdnUrl}/LATEST_RELEASE_${chromeVersionWithoutPatch}`)
  const chromedriverVersion = await response.text()
  console.log(`Compatible ChromeDriver version is ${chromedriverVersion}`)
  return chromedriverVersion
}
