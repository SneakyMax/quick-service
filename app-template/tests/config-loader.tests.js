import test from 'blue-tape'
import { loadConfig, __RewireAPI__ as rewire } from '../app/config-loader.js'

function mockConfig (config) {
  const configString = JSON.stringify(config)
  rewire.__Rewire__('fs', {
    readFile: function (file, callback) {
      if (file === 'config.json') {
        callback(null, configString)
      } else {
        callback('error')
      }
    }
  })
}

function end (assert) {
  if (!assert) throw new Error('missing argument in end')
  resetFs()
  assert.end()
}

function resetFs () {
  rewire.__ResetDependency__('fs')
}

test('loads config.json file', (assert) => {
  return new Promise((resolve, reject) => {
    const expected = {
      port: 8080
    }
    mockConfig(expected)

    loadConfig().then((actual) => {
      assert.deepEqual(actual, expected)
      end(assert)
    })
  })
})

test('requires a port in config file', async function (assert) {
  mockConfig({})

  try {
    await loadConfig()
    assert.fail('should error when missing config')
  } catch (err) {
    assert.pass('error was thrown with a missing port')
    resetFs()
  }
})

test('malformed config throws error', async function (assert) {
  mockConfig('malformed config{}')

  try {
    await loadConfig()
    assert.fail('should error with malformed config')
  } catch (err) {
    assert.pass('error was thrown with malformed config')
    resetFs()
  }
})
