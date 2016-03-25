import fs from 'fs-extra'
import promisify from 'es6-promisify'
import { execPromise, run } from './utils.js'

/** Clean build folders */
async function clean () {
  const remove = promisify(fs.remove)
  return remove('build')
}

/** ES6/7 Transpiling to build folder */
async function build (args) {
  await execPromise('babel app --out-dir build')
  await run(copyConfig, args)
}

/** Copies the config file into build. */
async function copyConfig (args) {
  var config = 'config/config.dev.json'

  const configIndex = args.indexOf('--config')
  if (configIndex !== -1) {
    config = args[configIndex + 1] || config
  }

  const copy = promisify(fs.copy)

  return copy(config, 'build/config.json')
}

/** Standard linting **/
async function lint () {
  await execPromise('standard --verbose | snazzy')
}

/** Unit tests **/
async function unitTests () {
  await execPromise('tape -r babel-register tests/**/*.* | tap-spec')
}

/** Runs the server. */
async function runServer () {
  await execPromise('node build/server.js')
}

/** Runs the server and watches for changes (to the server) */
async function runServerWithWatch () {
  await execPromise('nodemon --ignore build --ignore tests --exec "npm run build-and-run"')
}

/** Runs the server and runs tests, and watches for changes (tests or server). */
async function watchWithTests () {
  await execPromise('nodemon --ignore build/ --exec "npm run build-test-and-run"')
}

/** Cleans and then builds **/
async function cleanAndBuild (args) {
  await run(clean)
  await run(build, args)
}

/** Builds and runs the server. */
async function buildAndRun () {
  await run(cleanAndBuild)
  await run(runServer)
}

/** Builds, runs linting and tests, then runs the server. */
async function buildTestAndRun () {
  await run(cleanAndBuild)
  await run(lintAndTest)
  await run(runServer)
}

/** npm run test will run this, does unit tests and linting. */
async function lintAndTest () {
  await run(lint)
  await run(unitTests)
}

export default buildAndRun
export { clean, lintAndTest, buildAndRun, build, runServerWithWatch, watchWithTests, buildTestAndRun }
