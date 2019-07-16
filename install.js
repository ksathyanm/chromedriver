const fetch = require('node-fetch')
const ChromeLauncher = require('chrome-launcher')
const CDP = require('chrome-remote-interface')

const cdnUrl = process.env.npm_config_chromedriver_cdnurl || process.env.CHROMEDRIVER_CDNURL || 'https://chromedriver.storage.googleapis.com'

const getChromeVersion = async () => {
  const chrome = await ChromeLauncher.launch({ chromeFlags: ['--headless'] })
  const protocol = await CDP({ port: chrome.port })
  const { product } = await protocol.Browser.getVersion()
  const { chromeVersion } = /HeadlessChrome\/(?<chromeVersion>.*)/.exec(product).groups
  protocol.close()
  chrome.kill()
  return chromeVersion
}

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
