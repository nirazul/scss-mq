module.exports = {
  extends: [
    '@dreipol/stylelint-config',
    '@dreipol/stylelint-config-bem-pattern',
    '@dreipol/stylelint-config-order',
    '@dreipol/stylelint-config-scss',
  ],
  'rules': {
    indentation: [2, { severity: 'error' }],
    'scss/no-duplicate-dollar-variables': [true, {
      'ignoreInsideAtRules': ['each', 'else', 'for', 'function', 'if', 'mixin'],
    }],
  },
}
