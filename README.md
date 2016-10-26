# right-angled - building kit for angular2 data grids

[![Build Status](https://travis-ci.org/fshchudlo/right-angled.svg?branch=master)](https://travis-ci.org/fshchudlo/right-angled)
[![Dependency Status](https://david-dm.org/fshchudlo/right-angled.svg)](https://david-dm.org/fshchudlo/right-angled)
[![devDependency Status](https://david-dm.org/fshchudlo/right-angled/dev-status.svg)](https://david-dm.org/fshchudlo/right-angled?type=dev)
[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

Добро пожаловать на страницу right-angled - конструктора для построения списков в [Angular 2](https://github.com/angular/angular) приложениях.

## Changelog
Changelog is available [here](https://github.com/fshchudlo/right-angled/blob/master/CHANGELOG.md)

## Live demo
Live demo with documentation is available [here](https://fshchudlo.github.io/right-angled-demo)

## Смысл существования данного проекта
`right-angled` это библиотека для построения функциональных списков данных (они же таблицы, они же гриды).
        Еще в ней есть очень полезный selection, и неплохая модель работы с фильтрами. Selection и фильтры могут работать
        и вообще без списков, но особенно хороши с ними.

Главная характеристика, легшая в основу библиотеки, это "ненавязчивость". Которая выражается в следующем:
- Библиотека не привязана к таким фреймворкам как `bootstrap` и сама не включает ни единого стиля. Все решения по поводу того, как будет выглядеть приложение, на 100% за вами. Единственное, о чем вас попросит наша библиотека - определить стили для трех классов:
  `rt-sortable`, `rt-sort-asc` и `rt-sort-desc`. Эти классы определят, как будут выглядеть сортируемые столбцы ваших списков. Названия этих классов можно поменять на другие.

- Минимальное влияние на вашу верстку. Мы не стали, к примеру, делать кнопку перехода на следующую страницу списка с мириадами опций, позволяющими скрыть, или disable, 
или добавить класс, или сменить tooltip, когда переход на следующую страницу списка невозможен. И которую вам еще и придется стилизовать под свои потребности.
  Вместо это мы реализовали сервис, который вы можете заинжектить используя angular dependency injection в свою собственную кнопку и реализовать нужное вам поведение.
- Как следствие предыдущего пункта, библиотека содержит минимум директив и компонентов. Это означает, что некоторые компоненты придется реализовать вам. 
 Но мы уверены, что делать собственный компонент вам понравится больше, чем изучать множество опций и пытаться стилизовать сверстанный не вами компонент, верстку которого еще и невозможно модифицировать.
- Единственной зависимостью, помимо `angular`, является нами же написанная библиотека
            <a target="_blank" href="https://github.com/fshchudlo/e2e4">e2e4</a>. Данная библиотека реализует функционал списков в абстрактной манере и вообще не имеет зависимостей.

## How to build the project

To build the project, follow these steps:

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install them, use the following command:

  ```shell
  npm install -g gulp
  ```

3. From the project folder, execute the following command to install project dependencies:

  ```shell
  npm install
  ```
4. From the project folder, execute the following command to build the source code:

  ```shell
  gulp build
  ```

## How to run tests

You can run tests in chrome with watch mode by executing the following command: 

  ```shell
  gulp test
  ```
  or execute single run in PhantomJS:
  
  ```shell
  gulp test-single-run
  ```