#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process')

const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

// Разрешаем main + все ветки вида <type>/<issue-number>-<short-description>
const regex = /^(main|(feature|bugfix|tech|tests|docs|hotfix)\/[0-9]+-[a-z0-9-]+)$/

if (!regex.test(branch)) {
  console.error(`❌ Invalid branch name: "${branch}"
Branch names must follow one of the patterns:
  main
  <type>/<issue-number>-<short-description>
Example:
  feature/42-add-sources-crud`)
  process.exit(1)
}

console.log(`✅ Branch name "${branch}" is valid.`)
