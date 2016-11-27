# right-angled - building kit for angular2 data grids

[![Build Status](https://travis-ci.org/eastbanctechru/right-angled.svg?branch=master)](https://travis-ci.org/eastbanctechru/right-angled)
[![Coverage Status](https://coveralls.io/repos/github/eastbanctechru/right-angled/badge.svg?branch=master)](https://coveralls.io/github/eastbanctechru/right-angled?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/eastbanctechru/right-angled.svg)](https://david-dm.org/eastbanctechru/right-angled)
[![devDependency Status](https://david-dm.org/eastbanctechru/right-angled/dev-status.svg)](https://david-dm.org/eastbanctechru/right-angled?type=dev)
[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

Добро пожаловать на страницу right-angled - конструктора для построения списков в [Angular 2](https://angular.io) приложениях.

## Changelog
Changelog is available [here](https://github.com/eastbanctechru/right-angled/blob/master/CHANGELOG.md)

## Live demo
Live demo with documentation is available [here](https://eastbanctechru.github.io/right-angled-demo)

## Project Idea
`right-angled` is the library for constructing functional data tables (aka data lists, aka data grids). 
Also, it has a very useful selection model and quite a good model to work with filters. 
Selection and filters can work even without lists, but they go much better with them. 
The main feature providing the basis for the library is unobtrusiveness seen in the following:

- The library is not tied to such frameworks as <a target="_blank" href="https://getbootstrap.com">bootstrap</a> and does not include any css styles. 
It 100% up to you you how the app will be structured and look.
- Minimal impact on your markup. `right-angled` provides directives instead of components whenever it’s possible. 
There are only several components in `right-angled` which acts just as visibility containers without any additional markup. 
Again, it 100% up to you to how the app will structured and look.
- As a consequence of the above point, `right-angled` contains minimum of directives and components. 
It means that you will have to implement some of the components by yourself (`right-angled` provides several useful services which you can inject and use to implement your components easily). 
Nevertheless, we are sure that creating a new component will give you more pleasure, than learning dozens of options and trying to style an alien one with the markup that cannot be modified.
- The only dependency of `right-angled`, except <a target="_blank" href="https://angular.io">angular</a>, is the <a target="_blank" href="https://github.com/eastbanctechru/e2e4">e2e4</a> library created by us. This library implements the functionality for the lists in abstract manner with no dependencies at all. 

## How to build the project

To build the project, follow these steps:

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.

2. From the project folder, execute the following command to install project dependencies:

  ```shell
  npm install
  ```
3. From the project folder, execute the following command to build the source code:

  ```shell
  npm build
  ```

## How to run tests

You can run tests in Chrome with watch mode by executing the following command: 

  ```shell
  npm test:watch
  ```
  or execute single run in PhantomJS:
  
  ```shell
  npm test
  ```