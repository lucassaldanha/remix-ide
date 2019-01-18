var yo = require('yo-yo')
var csjs = require('csjs-inject')
// const remixLib = require('remix-lib')

// const styleguide = require('../ui/styles-guide/theme-chooser')
// const styles = styleguide.chooser()

class SwapPanelComponent {
  constructor () {
    // list of contents
    this.contents = {}
    // name of the current displayed content
    this.currentNode
  }

  showContent (moduleName) {
    // hiding the current view and display the `moduleName`
    if (this.contents[moduleName]) {
      this.contents[moduleName].style.display = 'block'
      if (this.currentNode) {
        this.contents[this.currentNode].style.display = 'none'
      }
      this.currentNode = moduleName
      return
    }
  }

  add (moduleName, content) {
    this.contents[moduleName] = yo`<div class=${css.plugItIn} >${content}</div>`
    this.view.appendChild(this.contents[moduleName])
  }

  remove (moduleName) {
    let el = this.contents[moduleName]
    if (el) el.parentElement.removeChild(el)
  }

  render () {
    this.view = yo`
      <div id='plugins' class=${css.plugins} >
      </div>
    `
    return this.view
  }
}

module.exports = SwapPanelComponent

const css = csjs`
  .plugins        {
    height         : 100%;
    overflow-y     : auto;
  }
  .plugItIn       {
    display        : none;
    height         : 100%;
  }
  .plugItIn.active     {
    display        : block;
  }
`
