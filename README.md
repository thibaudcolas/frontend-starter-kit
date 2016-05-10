Front-end starter kit [![Dependency Status](https://david-dm.org/springload/frontend-starter-kit.svg?style=flat-square)](https://david-dm.org/springload/frontend-starter-kit) [![devDependency Status](https://david-dm.org/springload/frontend-starter-kit/dev-status.svg?style=flat-square)](https://david-dm.org/springload/frontend-starter-kit#info=devDependencies) [ ![Codeship Status for springload/frontend-starter-kit](https://codeship.com/projects/88aa9190-7930-0133-0261-2292869b3ab0/status?branch=master)](https://codeship.com/projects/118683)
=====================

> A reference  for our latest code standards and examples of gulp tasks, CSS components, etc.

| Documentation in [`docs/`](https://github.com/springload/frontend-starter-kit/tree/master/docs) :book:|
|---------------------|
|[Front-end tech stack](docs/README.md)|
|[Useful tooling](docs/useful-tooling.md)|
|[Frontend Guidelines Questionnaire](docs/front-end-questionnaire.md)|
|[Demo page](https://rawgit.com/springload/frontend-starter-kit/master/core/templates/demo.html)|

## Installation

> Clone the project on your computer, and install [Node](https://nodejs.org). This project also uses [nvm](https://github.com/creationix/nvm).

From the command-line:

```sh
cd ~/Development/sites/
git clone git@github.com:springload/frontend-starter-kit.git
cd frontend-starter-kit
```

To install our dependencies:

```sh
nvm install
npm install --global eslint eslint-plugin-react babel-eslint eslint-config-airbnb sass-lint
# Then, install all project dependencies.
npm install
# Optionally, install the git hooks.
./.githooks/deploy
```

## Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Start the server and the development tools.
npm run start
# Builds frontend assets.
npm run build
# Runs linting.
npm run lint
# Runs tests.
npm run test
```

### Using the git hooks

> Git hooks automatically check your code before every commit.

```sh
# To enable the hooks, from the project root:
./.githooks/deploy
# To disable the hooks for a single commit, use the appropriate flag:
git commit --no-verify
```

### Tests

We use `mocha`, `chai` and `sinon` and for unit tests.

```sh
# Run all the tests.
npm run test
# Run unit tests.
npm run test:unit
# Run unit tests in a watcher.
npm run test:unit:watch
# Run your tests and outputs code coverage.
npm run test:unit:coverage
# And then to see the coverage:
open coverage/lcov-report/index.html
```

#### Test twitter metas

Fill the metas and check them using this website:

https://cards-dev.twitter.com/validator

#### Test favicons

Please check that the favicons meet all the standard requirements:

https://realfavicongenerator.net/favicon_checker

## Switching between NodeJS versions with [NVM](https://github.com/creationix/nvm)

Recommended way to install nvm and use it: `brew install nvm`

Then add the following to your .bash_profile
```
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

then `nvm` should be accessible in any terminal

Few useful commands:
`nvm ls-remote` (list all the available versions)
`nvm install v5.1.1` (will download and install v5.1.1 and automatically use it)
`nvm use v4.2.3` (will use node v4.2.3 if you have already installed it)

### Adding and upgrading dependencies

This project uses [`npm shrinkwrap`](https://docs.npmjs.com/cli/shrinkwrap) in order to pin all of the dependency tree for installation. The file that is used when installing the project is **`npm-shrinkwrap.json`**. To update it,

- First make sure you are using the right Node and npm versions with `node --version` and `npm --version` (should match the versions in the project's) `package.json`.
- Then install or upgrade dependencies by using `npm install --save <package>` or `npm install --save-dev <package>`. Manual installs will not be picked up by `shrinkwrap`.
- When you've confirmed the project still works with the new dependencies, run `npm run shrinkwrap` in order to regenerate the `npm-shrinkwrap.json` file
- Commit this file, and push.

## Deploying a new version

### To production

```sh
npm run deploy
```

From your local machine, it's a good idea to push to the master before
pushing to the deploy branch. That way you know that both are up to date.

### To staging

TODO

### Setting up tests on continuous integration

The CI tests require the following setup. Some of those might already be done within the CD build.

```sh
nvm install
npm install
npm install -g david depcheck hyperlink
```

Use `npm run test:ci` as part of the test pipeline.

## Documentation

### Browser support

> Copy/paste & adapt [Browser & device support template](https://github.com/springload/frontend-starter-kit/blob/master/docs/README.md#browser--device-support)
