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

Example report for this repository:

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

### [Hyperlink](https://github.com/Munter/hyperlink)

> Detect invalid and inefficient links on your webpages.

```sh
npm install -g hyperlink
hyperlink <htmlFile(s) | url(s)>
```

Example report for the `react-d3-integration` repository:

```
TAP version 13
# Crawling internal assets
ok 1 loading https://springload.github.io/react-d3-integration/
ok 2 loading https://springload.github.io/react-d3-integration/public/bundle.js
# Crawling 1 outgoing urls
ok 3 URI should have no redirects - https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css
not ok 4 URI should be secure - https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css
  ---
    operator: mixed-content
    expected:
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"
    actual:
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"
    at: https://springload.github.io/react-d3-integration/
  ...

1..4
# tests 4
# pass  3
# fail  1
```

### [sitespeed.io](https://github.com/sitespeedio/sitespeed.io)

> Helps you analyze and optimize your website speed and performance.

```sh
npm install -g sitespeed.io
sitespeed.io -u <URL>
# You can now open the report that has been generated in sitespeed-result/.
```

### [CSS stats](http://cssstats.com)

> Get some statistics about the CSS used on your project.

- Number of rules
- Number of selectors
- Specificity graph
- File size
- ...


Example report for the `react-d3-integration` repository: [Sitespeed.io report](https://springload.github.io/react-d3-integration/sitespeed-result/springload.github.io/2015-07-27-12-38-44/).

### [minigun](https://artillery.io/minigun/)

> Simple & powerful load-testing for HTTP(S)

```sh
npm install -g minigun
minigun quick -d 30 -r 5 <URL>
```

Example report for a quick test on an [OpenWeatherMap](http://openweathermap.org/forecast16) API call:

```
Complete report @ 2015-07-29T22:51:09.558Z
  Scenarios launched: 148
  Scenarios completed: 148
  Number of requests made: 148
  RPS: 4.48
  Request latency:
    min: 402.6
    max: 1510.88
    median: 405.97
    p95: 547.33
    p99: 1412.49
  Scenario duration:
    min: 403.41
    max: 1521.62
    median: 407.18
    p95: 548.31
    p99: 1420.86
  Codes:
    200: 148
```
