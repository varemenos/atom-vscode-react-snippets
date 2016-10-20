#!/usr/bin/env node

const get = require('./engine')

const packages = [
  'react',
  'javascript',
]

packages.map(item => get(item))
