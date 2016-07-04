## Performance Review

> During the discovery phase of a project we can use this document as a template to review the client's current website and set goals for the performance of their new site. We can use this document to present our findings and suggestions to the client.



> Use this section to explain the importantance of performance for both the client, and the clients customers.
### Why Performance?

Performance is the measure of how quickly you can deliver your site and services to your audience.

Fast sites create happy users. Studies show that when a site responds slowly, visitors spend less time there and are less likely visit again. Good performance not only improves user experience but can also improve a website’s search rankings – Google now prioritises both site speed and mobile-friendliness in their search listings.


> Test across varying network speeds, setup [Speedcurve](https://speedcurve.com/) and run tests through [WebPageTest](http://www.webpagetest.org/).
### Current performance statistics

**Speeds across a variety of networks:**

| Connection Speed | Start Render | Document Complate |
|---------|-----------|---------|
| Slow - 2G | 18+ seconds | 38+ seconds |
| Medium - 3G | 4 seconds | 10 seconds |
| Fast - Cable | 0.9 seconds | 4 seconds |

**Document complete** is an important performance metric, and we will be using this as part of our ongoing analysis in the new website build. It tells us when the all the content in the HTML has finished loading everything, and then fires an onload event and initiates any JavaScript on the page.

> To visually show the website loading, add links to [WebPageTest's](http://www.webpagetest.org/) videos or include timeline images/graphs.

**Network requests**
*Network requests are the number of requests made by the browser to the server to get the pieces of content on the page.*

Currently **site name** makes **[65] network requests**, and **[1.31MB] of data is downloaded** to the homepage. The majority of the requests are made up of JavaScript (22 requests), CSS (8), images (18) and fonts (5).

> Add pie graph or similar here to show visually.
> Add a summary here of what is largely contributing to the weight and/or number of requests.

Major contributors here are the Add This social sharing plugin, which sends multiple JavaScript requests; and the jQuery carousel (image slideshow).


### Browser & OS findings

Statistics taken from website statistics.

| OS | % of users |
|---------|-----------|
| Windows | 58% |
| Android | 20% |
| iOS | 18% |
| Mac | 4% |

| Browser | % of users |
|---------|-----------|
| Chrome | 41% |
| Internet Explorer 11 | 16% |
| Safari | 16% |
| Firefox | 7% |
| Internet Explorer 9 | 3.6% |

> Set out what we aim to achieve here eg:
### New performance targets

We will be building this new website with mobile in mind – from our findings above just under half of [Client Name]’s users are on a mobile device. This is one of the reasons it is especially important to optimise for performance. Users on a mobile device may experience limited coverage or network dropouts; our aim here will be to shorten load times, reduce network requests and have appropriate fallbacks when JavaScript is not available.

**We will aim for a 20% speed increase** and will use the mobile 3G statistics to help us determine our targets for page size and number of requests. We intend to use mobile 3G as it is a common usage scenario in which performance is crucial to the experience.

> The graph below focus's on the page speed we want to achieve:
**Current time: [Site Name] on mobile 3G (1.6 Mbps/768 Kbps 300ms RTT)**

| Start render | Document complete | Fully loaded |
|---------|-----------|-----------|
| 4.831s | 10.951s | 11.323s |
| **Target: 20% speed increase** |
| 3.86s | 8.76s | 9.05s |
| Page size: 376 KB | Page size: 858 KB | Page size: 882 KB |

Our performance targets on a 3G connection will be:
- **Document complete** in 8.7 seconds
- **Page size of 882 KB**, made up of HTML, CSS, JavaScript, Images, Video (Youtube) and fonts
- No more than **45 page requests**.

> To break this down further, into JS/CSS/image size, here is a handy tool: [Performance Budget](http://www.performancebudget.io/).

### Improving performance: Planned actions

We will continue to assess performance throughout the design and build phase, and may make design tweaks to keep the new site within our targets. We’ll:

- Optimise images and use SVG icons where possible (for logos, sharing icons etc). SVG also ensure the icons are crisp across different monitors and displays.
- Use best practices, such as minifying and combine CSS and JavaScript files, which will reduce requests and page size.
- Look at using alternatives to some of the JavaScript plugins on the page – as noted above, the Add This social sharing buttons add a lot of weight; we could get a similar effect using plain links and analytics tracking at quarter the size.
- Further improve the perceived performance of interactions where necessary (through the use of interaction feedback, animation and loading icons). Perceived performance refers to how fast a user thinks the website is, not necessarily how fast the technical stats say. This can often make the site feel just that much faster.
- Provide appropriate fallbacks for interactions where JavaScript is not available.
- Gracefully degrade support on older browsers.
- Set up web tools such as webpagetest.org and SpeedCurve to measure and monitor both the current site and the new site.

---

## Resources & Tools

**Useful Tools**
- [Google Page Speed](https://developers.google.com/speed/pagespeed/)
- [Louis](https://github.com/AvraamMavridis/gulp-louis), Louis is a gulp task that is used to analyze the performance of a website against a performance budget. **currently being tested on Te Tumu Paeroa**
- [Critical](https://www.npmjs.com/package/critical), Extract & Inline Critical-path CSS from HTML
- [WebpageTest](http://www.webpagetest.org/)
- [SpeedCurve](https://speedcurve.com/)
- [Performance Budget](http://www.performancebudget.io/), calculate your Performance Budget.

**Useful Resources & Articles**
- [Video Presentation](https://vimeo.com/135448379) by Yesenia Perez-Cruz on Design through the lens of performance [42:00]
- [Harry Roberts on Perf](http://csswizardry.com/2013/01/front-end-performance-for-web-designers-and-front-end-developers/)
- [Perf Rocks](http://perf.rocks/), general resources that help you build fast websites
- [Perf Tooling](http://www.perf-tooling.today/), a collection of resources which will help you to improve your workflow and to deliver better and faster websites.
- [Performance Budgets with Brad Frost](http://bradfrost.com/blog/post/performance-budget-builder/)
