# right-angled for Angular 2

[![Build Status](https://travis-ci.org/fshchudlo/right-angled.svg?branch=master)](https://travis-ci.org/fshchudlo/right-angled)
[![Dependency Status](https://david-dm.org/fshchudlo/right-angled.svg)](https://david-dm.org/fshchudlo/right-angled)
[![devDependency Status](https://david-dm.org/fshchudlo/right-angled/dev-status.svg)](https://david-dm.org/fshchudlo/right-angled?type=dev)
[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

Добро пожаловать на страницу right-angled - адаптер библиотеки [e2e4](https://github.com/fshchudlo/e2e4) для построения списков в [Angular 2](https://github.com/angular/angular) приложениях.

## Changelog
Changelog is available [here](https://github.com/fshchudlo/right-angled/blob/master/CHANGELOG.md)

## Live demo
Live demo with documentation is available [here](https://fshchudlo.github.io/right-angled-demo)

## Смысл существования данного проекта
`right-angled` это библиотека для построения функциональных списков данных (они же таблицы, они же гриды).
        Еще в ней есть очень полезный selection, и неплохая модель работы с фильтрами. Selection и фильтры могут работать
        и вообще без списков, но особенно хороши с ними.

Главная характеристика, легшая в основу библиотеки, это "ненавязчивость". Которая выражается в следующем:
- Библиотека не привязана к таким фреймворкам как `bootstrap` и сама не включает ни единого стиля. Все решения
            по поводу того, как будет выглядеть приложение, на 100% за вами.
- Библиотека почти не диктует, что писать в css. Единственное, о чем она вас попросит - определить стили для трех классов:
            `rt-sortable`, `rt-sort-asc` и `rt-sort-desc`. Эти классы определят, как будут выглядеть сортируемые столбцы
            ваших списков. Названия этих классов можно поменять на другие.
- Как вам известно, в `angular` есть директивы и компоненты. Компоненты это директивы с шаблоном. В `right-angled`,
            по возможности все сделано на директивах, которые просто добавят функционал к элементу, нарисованному вами, не
            влияя на структуру. Естественно, компоненты тоже понадобились, но у всех компонентов шаблон выглядит либо так:


  ```HTML
  <ng-content></ng-content>
  ```
  либо вот так:
  
  ```HTML
  <ng-content *ngIf="someCondition"></ng-content>
  ```

  То есть это просто контейнеры, а не верстка.
            
- Расширяемость. Спасибо `angular` и идее компонент. Теперь это стало возможным. В директивах и компонентах находится минимум
            кода. Весь функционал вынесен в сервиса, которые вы можете получить через dependency injection и использовать
            на свое усмотрение. Как расширяя наш набор компонентов, так и заменяя компоненты `right-angled` тем, что больше подходит вам.
- `right-angled` старается быть минималистичным. Минимум директив и опций, которые вам придется запоминать.
- Единственной зависимостью, помимо самого `angular`, является нами же написанная библиотека
            <a target="_blank" href="https://github.com/fshchudlo/e2e4">e2e4</a>. Данная библиотека как раз и реализует весь
            функционал в абстрактной манере и вообще не имеет зависимостей.

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