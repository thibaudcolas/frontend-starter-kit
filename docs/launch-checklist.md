# Frontend project launch checklist

> Handy things to remember when launching a project.

## How to use this

1. It will take you **around 2hours** to go through this list. Make sure you have the time.
2. Open the [raw markdown version](https://raw.githubusercontent.com/springload/frontend-starter-kit/master/docs/launch-checklist.md), copy the content of the "FED Launch Checklist" section and paste it into a new GitHub issue on the relevant project.
3. Move through the whole list and check items as you go.
4. Items should be checked even if they are irrelevant, but a reason should be provided (in the issue or via documentation).

## FED Launch Checklist

### Code quality

- [ ] Clean up commented/unnecessary code
- [ ] Check all TODO comments are still relevant
- [ ] Debugging console logs and breakpoints removed

####  CSS

- [ ] CSS code matches the code style guide via `npm run lint`
- [ ] [CSS validation](http://jigsaw.w3.org/css-validator/) passes
- [ ] CSS classes use a consistent naming methodology (BEM)
- [ ] Flexbox usage has a non-flexbox fallback if appropriate
- [ ] Sass code is free of vendor prefixes and IE filters
- [ ] TODO – CSS specificity graph is flat :rainbow:
- [ ] TODO – Print stylesheets exist if appropriate
- [ ] Site does not use `-webkit-font-rendering: antialised;` for body copy

#### JS

- [ ] JS code matches the code style guide via `npm run lint`
- [ ] JS code is written in ES6
- [ ] Data attributes are used to select elements, not classes or ids or tags.
- [ ] Polyfills are included if appropriate (Respond.js, `fetch`, `babel-polyfill`, etc)

#### HTML

- [ ] Ensure all `a` tags have an href attribute, and a title if relevant
- [ ] Use absolute paths for all URLS. `/thing/` not `thing/`
- [ ] Use HTTPS, or exclude protocol from URLs `//foo.com/` not `http://foo.com/`
- [ ] TODO - HTML validation passes
- [ ] Links do not use `target="_blank"`, or use [`rel="noopener`](https://mathiasbynens.github.io/rel-noopener/) if they need to.

#### Images

- [ ] Images use the right file format (SVG if possible, PNG for graphics, JPG for pictures)
- [ ] Icons are built using [SVG icons](https://github.com/springload/frontend-starter-kit/blob/master/core/templates/core/snippets/icon.html), with appropriate fallback if necessary
- [ ] All of the images are [optimized](https://imageoptim.com/)

### Functional completeness

- [ ] 404 page exists and is styled
- [ ] 500 page exists and is styled
- [ ] Maintenance page exists and is styled, if relevant
- [ ] Site has a favicon.ico
- [ ] Site uses a mobile-friendly, zoomable viewport
- [ ] [Apple-specific](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html) meta tags and favicon added
- [ ] Ensure meta tags, Open Graph tags, Twitter card tags, and descriptions are set
- [ ] Ensure the social meta tags only use a default sharing image if there is no page-specific image to use
- [ ] Google Search Console / Webmaster Tools is configured on the project
- [ ] Long-running actions (AJAX calls) trigger a spinner or other loading message in the UI.
- [ ] Form fields use the right [input types with the right mobile keyboard](http://baymard.com/labs/touch-keyboard-types)
- [ ] Form fields have their [`name`, `autocomplete` and `autocorrect` attributes](https://html.spec.whatwg.org/multipage/forms.html#attr-fe-autocomplete) set correctly
- [ ] Forms use server-side validation, and client-side validation if relevant
- [ ] Form errors are cleared when people change a field's value
- [ ] Significant UI states (tabs, modals, etc) should be tracked in the URL via query parameter or the hash.

### Build systems

- [ ] Use [Pleeease/Autoprefixer](http://pleeease.io) for all styles
- [ ] No compiled code in the `master` branch
- [ ] Assets are minified and concatenaded in production
- [ ] Critical CSS is extracted from the stylesheets and inlined in the HTML
- [ ] JS development aids are removed in production
- [ ] SVG icons are compressed in production

### Server configuration

- [ ] Static files are gzipped in production (JS/CSS/SVG)
- [ ] Static files are cached for a long time in production (JS/CSS/images)
- [ ] Static files are cache-busted in production (JS/CSS)

### Testing

- [ ] Site is visually tested on non-retina, low contrast screens
- [ ] Relevant unit tests are written
- [ ] Unit tests pass (`npm run test:unit`)
- [ ] Relevant integration tests are written
- [ ] Integration tests pass (`npm run test:integration`)
- [ ] Site works with JavaScript turned off, or the sections that do not work are [indicated to the user in `<noscript>` tags](https://github.com/springload/frontend-starter-kit/blob/master/core/templates/core/snippets/enable-javascript.html).
- [ ] Site tested in [all relevant browsers and devices](https://github.com/springload/frontend-starter-kit/tree/master/docs#browser--device-support) (including IE if relevant)
- [ ] ['Upgrade your browser'](https://github.com/springload/frontend-starter-kit/blob/master/core/templates/core/snippets/outdated-browser.html) message displayed on unsupported browsers.
- [ ] Run site url through the Facebook debugger (https://developers.facebook.com/tools/debug/) to check it will appear correctly if shared.
- [ ] Run the link checker [`hyperlink -r http://example.com/`](https://github.com/springload/frontend-starter-kit/blob/master/docs/useful-tooling.md#hyperlink)
- [ ] Spelling and grammar checked thoroughly (copy/paste the site's content in Google Docs)

### Performance

- [ ] TODO - Single pages are less than the allocated performance budget (unless there's a very good reason not to)
- [ ] Run through [Google page speed](https://developers.google.com/speed/pagespeed/), [GTmetrix](https://gtmetrix.com/)
- [ ] Configure the performance monitoring on the site's most important page (homepage?) on [SpeedCurve](https://speedcurve.com)
- [ ] Font files are available in WOFF, WOFF2, and EOT/OTF if relevant (IE8 / Android Stock Browser)
- [ ] TODO – Critical CSS is extracted and inlined in the HTML file if relevant
- [ ] Web fonts should be kept to a minimum (talk with designers)
- [ ] Subset webfonts to remove unused characters (http://www.subsetter.com/, https://github.com/miguelsousa/source-sans-pro-subset)

### Deployment

- [ ] Project uses [`npm shrinkwrap`](https://github.com/springload/frontend-starter-kit/#adding-and-upgrading-dependencies) to pin its dependencies.
- [ ] Build service / CI is using `NODE_ENV=production` for compilation tasks
- [ ] No unnecessary files (`node_modules`) are sent to the production server, slowing down the build.
- [ ] CI runs the CI tests (`npm run test:ci`, or `npm run test`), and the build breaks if they fail

### Semantics

- [ ] Relevant site sections use [schema.org](http://schema.org/) annotations with microdata markup (events, products, persons, etc)

### SEO

- [ ] Link to sitemap `< link rel=”sitemap” type=”application/xml” title=”Sitemap” href=”/sitemap.xml” />”`
- [ ] Sitemap content is relevant
- [ ] Help pagination with rel=”next” and rel=”prev” tag
- [ ] robots.txt is here
- [ ] humans.txt is here (forbidden in robots.txt)

### Analytics

- [ ] Google Tag Manager or Google Analytics are used on all pages
- [ ] Check analytics are configured in development with a development property
- [ ] Check analytics are configured in production with the production property
- [ ] Check the relevant client-side interactions are tracked with events
- [ ] If relevant, client-side errors are logged as [exceptions](https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions)
- [ ] Page and event tracking is being displayed correctly in the GA dashboard.

### Accessibility

- [ ] Roles are assigned to basic site sections
header - `role="banner"`, main content - `role="main"`, footer - `role="contentinfo"`
- [ ] All images must have appropriate alt tags - extra great if you include all text that appears eg English and Māori translation text in a lot of company logos in NZ. [empty `alt=""` can be appropriate](http://osric.com/chris/accidental-developer/2012/01/when-should-alt-text-be-blank/)
- [ ] If relevant, icons include an accessible label with the `<title>` SVG tag
- [ ] html element has attribute `lang="en-nz"`
- [ ] Make sure you have called the tab focus function in utils js file
- [ ] Screen reader only text for links with images/icons only
- [ ] Form fields are inside the label element
- [ ] Form error messages should be inside label element
- [ ] All toggle content should have aria controls and expanded states
- [ ] Most important content and pages are tested for color-blindness and vision disorders with http://lowvision.support/
- [ ] Body copy and visuals have enough contrast according to WCAG guidelines https://leaverou.github.io/contrast-ratio/

### Documentation

- [ ] The code documents itself via function names and variable names
- [ ] The code contains comments to explain its intent where appropriate

#### The README contains

- [ ] Project installation instructions
- [ ] Project development commands
- [ ] Test commands
- [ ] [Browser support definition](https://github.com/springload/frontend-starter-kit#browser-support)
- [ ] Stage and Live site URLs
- [ ] Analytics and montoring URLs
- [ ] Links to Trello board, Harvest project, important scope documents
- [ ] The project's useful patterns to reuse
- [ ] Debugging tricks
- [ ] Testing data
