#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const spawn = require('child_process').spawn

function spawnProcess (command, callback) {
  const childProcess = spawn(command, [], {
    shell: true,
    stdio: 'inherit'
  })

  childProcess.on('exit', (code, signal) => {
    if (code !== 0) {
      callback(code)
    } else {
      callback(null)
    }
  })
}

const source = path.join(__dirname, '../app-template')
const destination = path.join(process.cwd(), '.')

// TODO make sure we're not clobbering stuff
fs.copy(source, destination, function (err) {
  if (err) return console.error(err)

  spawnProcess('npm install', function (err) {
    if (err) return console.log(err)
  })
})
