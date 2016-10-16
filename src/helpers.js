const https = require('https')

const handleErrors = (err) => {
  console.log(err)
  console.log('snippet convertion failed')
}

// credits to http://stackoverflow.com/a/17676794/649239
const download = (url, cb) => {
  'use strict'

  https.get(url, (res) => {
    let body = ''

    res
      .on('data', (chunk) => {
        body += chunk
      })
      .on('end', () => cb(JSON.parse(body)))
      .on('error', (err) => {
        handleErrors(err)
      })
  })
}

const escapeString = str =>
  JSON
    .stringify(str) // Escape the string
    .split('"')[1] // removes the duplicate doublequotes which are a result of JSON.stringifing a string

const convertSnippets = (snippets) => {
  const inner = {}

  Object
    .keys(snippets)
    .forEach((snippet) => {
      inner[snippet] = {
        prefix: `${snippets[snippet].prefix}`,
        description: `${escapeString(snippets[snippet].description)}`,
        body: `${escapeString(snippets[snippet].body)}`,
      }
    }
  )

  return {
    'source.js.jsx': inner,
  }
}

module.exports = {
  convertSnippets,
  download,
  handleErrors,
}
