module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier',
  ],
  'rules': {
    indentation: [2, { severity: 'error' }],
    'string-quotes': ['single', { severity: 'error' }],
  },
}
