#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const CSON = require('cson')

const writeTo = path.resolve(__dirname, '../snippets/react.cson')

const helpers = require('./helpers')

const download = helpers.download
const handleErrors = helpers.handleErrors
const convertSnippets = helpers.convertSnippets

download(
  'https://raw.githubusercontent.com/xabikos/vscode-react/master/snippets/snippets.json',
  (snippets) => {
    CSON.createCSONString(convertSnippets(snippets), {
      indent: '  ',
    }, (err, result) => {
      if (!err) {
        try {
          fs.writeFileSync(writeTo, result, 'utf8')
        } catch (e) {
          handleErrors(e)
        }
      } else {
        handleErrors(err)
      }
    })
  }
)
