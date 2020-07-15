# scss-mq
Media query helper library for sass.

[![Build Status][workflow-image]][workflow-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![CC0-1.0][license-image]][license-url]

# Installation
```bash
npm i -S @nirazul/scss-mq
```

# Usage

1. Add the main file to your scss:
  ```scss
  @use '@nirazul/scss-mq' as mq
  ```

2. Configure the lib according to your project's breakpoints:
  ```scss
  @include mq.configure(('phone' 544px 'tablet' 992px 'desktop'))
  ```

3. Start styling your breakpoints at your will
  ```scss
  @include mq.media(('phone')) { /* my phone styles */ }
  ```

# Documentation

## Viewports and breakpoints
Add your breakpoints as a list of viewport names followed by a width.
The neighbouring breakpoints limit the viewport: Left is included, right is excluded.

```scss
@include mq.configure(('xs' 544px 'sm' 768px 'md' 992px 'lg' 1280px 'xl'));
```

Either apply styles using viewports or a relative definition:

```scss
@include mq.media('xs') { /* #1 */ }
@include mq.media('>xs') { /* #2 */ }
@include mq.media('>=md') { /* #3 */ }
```
This compiles to:
```css
@media (max-width: 543px) { /* #1 */ }
@media (min-width: 544px) { /* #2 */ }
@media (min-width: 768px) { /* #3 */ }
```

Notice that some expressions don't make sense as they would always be true or invalid.
In that case, they return an error:

```scss
// Antipattern - Do not use!
@include mq.media('>=xs') {
  /* error, as the query would always be active */
}
@include mq.media('<xs') {
  /* error, as the query would be invalid due to a negative width */
}
@include mq.media('>xl') {
  /* error, as "xl" has no upper limit */
}
```

### Absolute values
For one-off scenarios you can use custom widths.
When using exclude operators ('>' and '<') the width is reduced by an amount defined by the configurable global values stored in `$unit-intervals`.

### Combining media queries
You may combine expressions using a list. The list separator defines the conjunction type.

#### "AND" conjunction
To logically connect two expressions with "AND", use a list separator of type `space`:

```scss
@include mq.media(('>sm' '<=lg')) { /* #1 */}
```
This compiles to:
```css
@media (min-width: 768px) and (max-width: 1279px) { /* #1 */ }
```

#### "OR" conjunction
To logically connect two expressions with "OR", use a list separator of type `comma`:

```scss
@include mq.media(('<sm', '>lg')) { /* #1 */}
```
This compiles to:
```css
@media (max-width: 543px), (max-width: 1280px) { /* #1 */ }
```

#### Nesting expressions
You can even nest expressions and conjunctions. They will be resolved recursively.
Notice that there is often a simpler way to achieve the same result.

```scss
@include mq.media(('xs', ('>md' '<=lg'))) { /* #1 */}
```
This compiles to:
```css
@media (max-width: 543px), (min-width: 992px) and (max-width: 1279px) { /* #1 */ }
```

## Multiple configurations
You may use multiple configurations by adding a name. The default config name is `default`.

```scss
@include mq.configure(('xs' 544px 'sm' 768px 'md' 992px 'lg' 1280px 'xl')); // Stored as 'default'
@include mq.configure(('phone' 768px 'desktop'), 'simple'); // Stored as 'simple'

@include mq.media('>xs') { /* Uses 'default' config */ }
@include mq.media(('>phone'), 'simple') { /* Uses 'simple' config */ }
```

**Important**
<br>
When using a config name, you need to pass a list as the first argument to `mq.media`!

## Media type and feature expressions
These are the built-in media type and feature expressions that you can use alongside width expressions:

- `screen` > `screen`
- `print` > `print`
- `portrait` > `(orientation: portrait)`
- `landscape` > `(orientation: landscape)`
- `res2x` > `(min-resolution: 2dppx)`
- `res3x` > `(min-resolution: 3dppx)`

These expressions will be made customizable in a future release.

They are fully mixable with any other expression available to you:

```scss
@include mq.media(('screen' '>md')) { /* #1 */}
```
This compiles to:
```css
@media screen and (min-width: 992px) { /* #1 */ }
```

## Global configuration options
There is a number of global config options that have an effect on all available width configs.
You can configure these options individually or all at once.

### Unit intervals
Unit intervals increase or reduce limit sizes when using exclude operators ('>' and '<').

```scss
@include mq.configure-globally($unit-intervals: (('px': 1, 'em': 0.005, 'rem': 0.01, '': 0));
```

**Default values**
```scss
$unit-intervals: ('px': 1, 'em': 0.01, 'rem': 0.1, '': 0);
```

### Allowed operators
Width expressions can often be written in multiple ways.
Considering the following config:

```scss
@include mq.configure-globally(('xs' 544px 'sm' 768px 'md' 992px 'lg'));
```

In this case `>=sm` is identical to `>xs` regarding the css output.
To reduce possible media expressions you can explicitly allow only a subset of available operators:

```scss
@include mq.configure-globally($allowed-operators: ('<=', '≤', '>'));
```

**Default values**
```scss
$allowed-operators: ('>=', '>', '<=', '<', '≥', '≤');
```

### Media type and feature expressions
Coming soon...

# Credits
Originally, this library was a fork of [`@dreipol/scss-mq`](https://github.com/dreipol/scss-mq) and implemented [`include-media`](https://github.com/eduardoboucas/include-media).
<br>
It is now maintained separately and as one package to speed up implementation of features such as the sass module syntax.

[workflow-image]:https://img.shields.io/github/workflow/status/nirazul/scss-mq/test?style=flat-square
[workflow-url]:https://github.com/nirazul/scss-mq/actions

[license-image]:https://img.shields.io/github/license/nirazul/scss-mq?style=flat-square
[license-url]:LICENSE

[npm-version-image]:https://img.shields.io/npm/v/@nirazul/scss-mq?style=flat-square
[npm-downloads-image]:https://img.shields.io/npm/dm/@nirazul/scss-mq.svg?style=flat-square
[npm-url]:https://npmjs.org/package/@nirazul/scss-mq
