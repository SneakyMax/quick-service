import 'babel-polyfill'
import chalk from 'chalk'
import { run } from './utils'

const [,, moduleName, command, ...args] = process.argv
const module = require(`./${moduleName}`)
const func = module[command || 'default']

if (!func) {
  const validProperties = Object.keys(module).join(', ')

  console.error(chalk.red(`Unknown command ${command}. Valid commands are: ${validProperties}.`))
  process.exit(1)
}

console.log(`Running ${moduleName}/${command} ${args}`)

run(func, args)
  .catch((err) => {
    if (err.stack) {
      console.error(err.stack)
    } else if (err) {
      console.error(err)
    }
    process.exit(1)
  })
