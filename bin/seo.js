var seochecker = require('seo-checker');
var argv = require('yargs').argv;

if (argv.url === undefined) {
    console.log('Please specify a URL using --url [URL].');
    return false;
}

seochecker.load(argv.url, function(response) {
    if(!response) { // response will be false on error
        console.log('Error while loading page');
        return false;
    } else {
        var metas = seochecker.meta(response);
        var missing = false;
        for (var property in metas) {
            if (metas.hasOwnProperty(property)) {
                if(metas[property] === null) {
                    console.log('Metas missing for key ' + property);
                    missing = true;
                }
                if(property === 'imgAccessibility' && metas[property] < 100) {
                    console.log('Some images are missing alt/title attributes');
                    missing = true;
                }
            }
        }
        return missing;
    }
});
