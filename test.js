/* eslint-env mocha */
const { expect } = require("chai")
const installer = require("./src/installer.js")

describe("find chrome version", () => {
  it("finds chrome version", async () => {
    try {
      const chromedriverVersion = await installer.findChromeDriverVersion()
      console.log(chromedriverVersion)
      expect(chromedriverVersion).to.exist
      expect(chromedriverVersion).to.not.be.empty
      expect(chromedriverVersion).to.be.a("string")
      expect(chromedriverVersion).to.match(/^\d+.\d+.\d+.\d+$/)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})
