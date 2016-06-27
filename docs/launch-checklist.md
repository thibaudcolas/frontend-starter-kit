# Frontend project launch checklist

> Handy things to remember when launching a project.

## How to use this

TODO

## The List

### Code quality
- [ ] Images optimized and includes an alt tag
- [ ] Clean up commented code/unnecessary code
- [ ] JS code matches the code style guide via `npm run lint`
- [ ] CSS code matches the code style guide

### Functional completeness
- [ ] Console logs removed
- [ ] 404 page exists and is styled
- [ ] [Apple-specific](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html) meta tags and favicon added
- [ ] Add ga tracking to client-side interactions
- [ ] Use absolute paths for all URLS. `/thing/` not `thing/`
- [ ] Exclude protocol from URLs `//foo.com/` not `http://foo.com/`

### Build systems
- [ ] Use [Autoprefixer](http://pleeease.io) for all styles
- [ ] No compiled code in the repository

### Testing
- [ ] Site tested in all relevant browsers
- [ ] 'Upgrade your browser' message displayed on unsupported browsers.
- [ ] Run site url through the Facebook debugger (https://developers.facebook.com/tools/debug/) to check it will appear correctly if shared.
- [ ] No broken links (http://validator.w3.org/checklink)
- [ ] [CSS validation](http://jigsaw.w3.org/css-validator/validator)
- [ ] Spelling and grammar checked throughly

### Performance
- [ ] Single pages are less than 500k (unless there's a very good reason)
- [ ] Run through [Google page speed](https://developers.google.com/speed/pagespeed/)
- [ ] Assets are minified correctly (either in the nodejs pipeline or by Django).

### Deployment
- [ ] Make sure the build service (eg, CodeShip) is using `NODE_ENV=production` for compilation tasks
- [ ] Make sure no unnecessary files (`node_modules`) are sent to the production server, slowing down the build.

## Documentation
- [ ] Browser support is documented in the README
- [ ] Stage and Live site URL's have been added in the README
- [ ] Trello board and important scope documents are added in the README
- [ ] The project's useful patterns are listed in the [front-end patterns](https://github.com/springload/wiki/blob/master/front-end-team/project-patterns.md) list

### SEO
- [ ] Google Tag Manager or Google UA added to the base template.
- [ ] Page and event tracking is being displayed correctly in the GA dashboard.
- [ ] Ensure meta tags, opengraph tags, social media icons and descriptions are set.
- [ ] [Facebook OG](https://developers.facebook.com/docs/opengraph/using-objects?locale=ru_RU#selfhosted-creating) meta tags
- [ ] [Twitter cards](https://dev.twitter.com/cards/markup) meta tags
- [ ] Link to sitemap < link rel=”sitemap” type=”application/xml” title=”Sitemap” href=”/sitemap.xml” />”
- [ ] Links have a title attribute
- [ ] Help pagination with rel=”next” and rel=”prev” tag
- [ ] robots.txt
- [ ] humans.txt

### Analytics
- [ ] Check analytics are configured in development [with the development property](https://github.com/springload/wiki/blob/master/_springload-coding-standards/analytics/setting-up-analytics-for-clients.md)
- [ ] Check analytics are configured in production with the production property

### Accessibility
- [ ] Roles are assigned to basic site sections
header - role="banner", main content - role="main", footer - role="contentinfo"
- [ ] All images must have alt tags - extra great if you include all text that appears eg English and Māori translation text in a lot of company logos in NZ.
- [ ] html element has attribute lang="en-nz"
- [ ] Make sure you have called the tab focus function in utils js file
- [ ] Screen reader only text for links with images/icons only
- [ ] Form error messages should be inside label element
- [ ] All toggle content should have aria controls and expanded states
- [ ] Most important content and pages are tested for color-blindness and vision disorders with http://lowvision.support/
- [ ] Body copy and visuals have enough contrast according to WCAG guidelines https://leaverou.github.io/contrast-ratio/

-----

### Useful tools for debugging websites

#### Hyperlink (link checker)

Hyperlink is a dead link checker. You can run it as part of a test pipeline, or manually.

```
npm install -g hyperlink
hyperlink -r http://google.com/
```

Documentation: [here](https://github.com/Munter/hyperlink)

#### SiteSpeed

SiteSpeed checks the performance of your assets and HTTP requests.

```
npm install -g sitespeed.io
sitespeed.io -u https://springload.github.io/react-d3-integration/
# You can now open the report that has been generated in sitespeed-result/.
```

See an [example report](https://springload.github.io/react-d3-integration/sitespeed-result/springload.github.io/2015-07-27-12-38-44/)
