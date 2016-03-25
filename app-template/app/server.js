import restify from 'restify'
import { loadConfig } from './config-loader'
import chalk from 'chalk'

// When in the server the working directory needs to be this directory.
process.chdir(__dirname)

async function startServer (config) {
  const server = restify.createServer()
  server.config = config

  server.listen(config.port, () => {
    console.log(`${server.name} listening at ${server.url}`)
  })
}

async function start () {
  const config = await loadConfig()
  await startServer(config)
}

start().catch((err) => {
  console.error(chalk.red(err))
  process.exit(1)
})
