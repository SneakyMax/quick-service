import fs from 'fs-extra'
import promisify from 'es6-promisify'

async function loadConfigFile () {
  const readFile = promisify(fs.readFile)

  const configString = await readFile('config.json')
  return JSON.parse(configString)
}

function ensureConfigSetUpCorrectly (config) {
  if (!config.port) {
    throw new Error('config.json file is missing a port to use.')
  }
}

async function loadConfig () {
  const config = await loadConfigFile()
  ensureConfigSetUpCorrectly(config)
  return config
}

export { loadConfig }
