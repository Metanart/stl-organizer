module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 100,
  trailingComma: 'none',
  importOrder: [
    '^typeorm/(.*)$',
    '^@shared/(.*)$',
    '^@/(.*)$',
    '^\\.\\./', // ../anything
    '^\\./' // ./anything
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators'],
  plugins: ['@trivago/prettier-plugin-sort-imports']
}
