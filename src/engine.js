/* eslint-env node */

const fs = require('fs')
const path = require('path')
const CSON = require('cson')
const https = require('https')

const handleErrors = err => console.log(`snippet convertion failed. Error: ${err}`)

const download = (url, cb) => {
  https.get(url, (res) => {
    // eslint-disable-next-line no-var
    var body = ''

    res
      .on('data', (chunk) => {
        body += chunk
      })
      .on('end', () => cb(JSON.parse(body)))
      .on('error', err => handleErrors(err))
  })
}

const convertSnippets = (snippets) => {
  const inner = {}

  Object
    .keys(snippets)
    .forEach((snippet) => {
      inner[snippet] = {
        prefix: `${snippets[snippet].prefix}`,
        description: `${snippets[snippet].description}`,
        body: `${snippets[snippet].body}`,
      }
    })

  return {
    '.source.js.jsx': inner,
  }
}

const getUrl = str => `https://raw.githubusercontent.com/xabikos/vscode-${str}/master/snippets/snippets.json`
const getPath = str => path.resolve(__dirname, `../snippets/${str}.cson`)

module.exports = pkg => download(getUrl(pkg), (snippets) => {
  CSON.createCSONString(convertSnippets(snippets), {
    indent: '  ',
  }, (err, result) => {
    if (!err) {
      try {
        fs.writeFileSync(getPath(pkg), result, 'utf8')
      } catch (e) {
        handleErrors(e)
      }
    } else {
      handleErrors(err)
    }
  })
})
