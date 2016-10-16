/* eslint-env node */


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

module.exports = {
  convertSnippets,
  download,
  handleErrors,
}
