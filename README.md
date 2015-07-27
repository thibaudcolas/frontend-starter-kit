Front-end starter kit
=====================

A reference  for our latest code standards and examples of gulp tasks, CSS components, etc.

## Useful tooling

### [Disc](http://hughsk.io/disc/)

> Track down bloat in Browserify project bundles.

```sh
npm install -g disc
discify public/bundle.js > disc-report.html
# Voilà! Open the file in your browser.
```

Here's an [example report](https://springload.github.io/react-d3-integration/disc-report.html) for the `react-d3-integration` repository.

### [David](https://github.com/alanshaw/david)

> Tells you when your `npm` dependencies are out of date.

```sh
npm install -g david
david
```

Example report:

```
devDependencies

┌────────────────┬─────────┬────────┐
│ Name           │ Package │ Latest │
├────────────────┼─────────┼────────┤
│ gulp-sass      │ ^1.2.2  │ 2.0.4  │
├────────────────┼─────────┼────────┤
│ gulp-scss-lint │ ^0.1.12 │ 0.2.2  │
├────────────────┼─────────┼────────┤
│ browserify     │ ^10.1.3 │ 11.0.0 │
└────────────────┴─────────┴────────┘
```
