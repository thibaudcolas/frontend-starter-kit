## Troubleshooting all the things!

### Error: `libsass` bindings not found. Try reinstalling `node-sass`

Reinstall the module that you are using to compile Sass. It can be either:

```sh
npm install --save-dev gulp-sass
# or
npm install --save-dev grunt-sass
```

Do not install `node-sass` directly unless you plan on using it directly.

### npm ERR! addLocal Could not install <project>/build

This happens because of shrinkwrapped projects where some dependencies were resolved to a local cache of packages that were built on the computer before publishing.

Use `cat npm-shrinkwrap.json | grep "file:build" --context=4` to find out which packages are impacted, then remove them from the local cache with `npm cache clean <package>` and `npm install --save` them again.

### `npm install` taking a very long time to download packages and destroying network connectivity

- Add `registry=http://registry.npmjs.org/` to `~/.npmrc` to force HTTP requests instead of HTTPS.
- If the project is using a `npm-shrinkwrap.json` file, run `sed -i 's/https/http/g' npm-shrinkwrap.json` to change all of its URLS to HTTP.
