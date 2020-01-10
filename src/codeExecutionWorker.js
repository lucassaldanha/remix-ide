/* global eval */
'use strict'
import { connectIframe, PluginClient } from '@remixproject/plugin'
import ethers from 'ethers' // eslint-disable-line
import Web3 from 'web3' // eslint-disable-line
import swarmgw_fn from 'swarmgw' // eslint-disable-line
window.swarmgw = swarmgw_fn() // eslint-disable-line
window.web3 = null // eslint-disable-line
window.ethers = ethers
window.Web3 = Web3

class CodeExecutor extends PluginClient {
  execute (script) {
    if (!this.currentRequest.isFromNative) return
    if (script) { // looks like this was called more than one time, the second time script was undefined...  might be a bug in remix-plugin
      try {
        (new Function(script))() // eslint-disable-line
      } catch (e) {
        this.emit('log', {
          cmd: 'error',
          data: [e.message]
        })
      }
    }
  }
}
window.codeExec = new CodeExecutor()
connectIframe(window.codeExec)
console.log = function () {
  window.codeExec.emit('log', {
    cmd: 'log',
    data: Array.from(arguments)
  })
}

console.info = function () {
  window.codeExec.emit('log', {
    cmd: 'info',
    data: Array.from(arguments)
  })
}

console.warn = function () {
  window.codeExec.emit('log', {
    cmd: 'warn',
    data: Array.from(arguments)
  })
}

console.error = function () {
  window.codeExec.emit('log', {
    cmd: 'error',
    data: Array.from(arguments)
  })
}
