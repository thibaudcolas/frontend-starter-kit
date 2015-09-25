Front-end starter kit [![Dependency Status](https://david-dm.org/springload/frontend-starter-kit.svg?style=flat-square)](https://david-dm.org/springload/frontend-starter-kit) [![devDependency Status](https://david-dm.org/springload/frontend-starter-kit/dev-status.svg?style=flat-square)](https://david-dm.org/springload/frontend-starter-kit#info=devDependencies)
=====================

> A reference  for our latest code standards and examples of gulp tasks, CSS components, etc.

> The front-end documentation lives in the [`docs` subfolder](https://github.com/springload/frontend-starter-kit/tree/master/docs).

## Installation

> You first need to clone the project on your computer.

From the command-line:

```sh
cd ~/Development/sites/
git clone git@github.com:springload/frontend-starter-kit.git
cd frontend-starter-kit
```

To install our dependencies:

```sh
npm install --global nodemon jscs eslint eslint-plugin-react babel-eslint eslint-config-airbnb
gem install scss_lint
# Then, install all project dependencies.
npm install
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

### Tests

We use `mocha`, `chai`, `sinon` and `isparata` for unit tests.

```sh
# Run all the tests.
npm run test
# Run unit tests.
npm run test:unit
# Run unit tests in a watcher.
npm run test:unit:watch
# Run your tests and outputs code coverage.
npm run test:unit:coverage
```

## Deploying a new version

### To production

```sh
npm run deploy
```

From your local machine, it's a good idea to push to the master before
pushing to the deploy branch. That way you know that both are up to date.

### To staging

TODO
