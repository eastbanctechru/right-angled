[![npm version](https://badge.fury.io/js/right-angled.svg)](https://badge.fury.io/js/right-angled)
[![Build Status](https://travis-ci.org/eastbanctechru/right-angled.svg?branch=master)](https://travis-ci.org/eastbanctechru/right-angled)
[![Coverage Status](https://coveralls.io/repos/github/eastbanctechru/right-angled/badge.svg?branch=master)](https://coveralls.io/github/eastbanctechru/right-angled?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/eastbanctechru/right-angled.svg)](https://david-dm.org/eastbanctechru/right-angled)
[![devDependency Status](https://david-dm.org/eastbanctechru/right-angled/dev-status.svg)](https://david-dm.org/eastbanctechru/right-angled?type=dev)

<div style="margin: 30px 0;">
   <a href="https://github.com/eastbanctechru/right-angled">
    <img src="https://raw.githubusercontent.com/eastbanctechru/right-angled/master/logo.png">
  </a>
</div>

## What is it

right-angled is a lightweight and easy to use angular data grids which integrates with your markup and styles rather than generating its own

## Getting started

Check out our demo application at [https://eastbanctechru.github.io/right-angled-demo/](https://eastbanctechru.github.io/right-angled-demo)

## Install

  ```shell
  npm install right-angled
  ```

## TL;DR

`right-angled` is the library for constructing functional data tables (aka data lists, data grids). 
Also, it has a very useful selection and filter models. 
They can work even without lists, but they go much better with them. The main feature providing the basis for the library is unobtrusiveness seen in the following:

- The library is not tied to such frameworks as [bootstrap](https://getbootstrap.com) and does not include any css styles. It is 100% up to you how the app will be structured and look. 
- Minimal impact on your markup. `right-angled` provides directives instead of components whenever it’s possible. 
There are only several components in `right-angled` and they act just as visibility containers without any additional markup. 
Again, it is 100% up to you how the app will structured and look.
- As a consequence of the above point, `right-angled` contains minimum of directives and components. 
It means that you will have to implement some of the components yourself (`right-angled` provides several useful services which you can inject and use to implement your components easily). 
Nevertheless, we are sure that creating a new component will give you more pleasure, than learning dozens of options and trying to style an alien one with the markup that cannot be modified.
- The only dependency of `right-angled`, except [angular](https://angular.io), is the [e2e4](https://github.com/eastbanctechru/e2e4) library created by us. This library implements the functionality for the lists in abstract manner with no dependencies at all.  

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
  or execute single run:
  
  ```shell
  npm test
  ```

You can also use [Yarn](https://yarnpkg.com/)
