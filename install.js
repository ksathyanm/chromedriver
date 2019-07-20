const fetch = require('node-fetch')
const getChromeVersion = require("@ksathyanm/find-chrome-version")

const cdnUrl = process.env.npm_config_chromedriver_cdnurl || process.env.CHROMEDRIVER_CDNURL || 'https://chromedriver.storage.googleapis.com'


const getChromeDriverVersion = async (chromeVersion) => {
  const { chromeVersionWithoutPatch } = /(?<chromeVersionWithoutPatch>.*)[.]\d+/.exec(chromeVersion).groups
  const response = await fetch(`${cdnUrl}/LATEST_RELEASE_${chromeVersionWithoutPatch}`)
  return response.text()
}

(async () => {
  const chromeVersion = await getChromeVersion()
  console.log(`Your Chrome version is ${chromeVersion}`)

  const chromedriverVersion = await getChromeDriverVersion(chromeVersion)
  console.log(`Compatible ChromeDriver version is ${chromedriverVersion}`)
})()
