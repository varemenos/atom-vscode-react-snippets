#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const CSON = require('cson')

const readFrom = path.resolve(__dirname, '../tmp/vscode_snippets.json')
const writeTo = path.resolve(__dirname, '../dist/snippets.cson')

const helpers = require('./helpers')

const download = helpers.download
const handleErrors = helpers.handleErrors
const convertSnippets = helpers.convertSnippets

download(
  'https://raw.githubusercontent.com/xabikos/vscode-react/master/snippets/snippets.json',
  readFrom,
  () => {
    const snippets = JSON.parse(fs.readFileSync(readFrom, 'utf8'))

    CSON.createCSONString(convertSnippets(snippets), {}, (err, result) => {
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
