import chalk from 'chalk'
import { spawn } from 'child_process'

function execPromise (command, ...args) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args || [], {
      shell: true,
      stdio: 'inherit'
    })

    childProcess.on('exit', (code, signal) => {
      if (code !== 0) {
        const argsString = (args || []).join(' ')
        console.error(chalk.red(`Command ${command} ${argsString} exited with code ${code}, did not run successfully.`))
        reject(code)
      } else {
        resolve()
      }
    })
  })
};

async function run (func, args = []) {
  const startTime = new Date()

  try {
    console.log(`Starting ${func.name}...`)
    await func(args)

    const endTime = new Date()
    const secondsElapsed = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(1)

    console.log(chalk.green(`Script ${func.name} completed successfully in ${secondsElapsed} seconds.`))
  } catch (err) {
    const argsString = args.join(' ')
    console.error(chalk.red(`Script ${func.name} ${argsString} did not run successfully. ${err}`))
    throw err
  }
}

export { execPromise, run }
