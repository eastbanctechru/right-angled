# right-angled for Angular 2

[![Build Status](https://travis-ci.org/fshchudlo/right-angled.svg?branch=master)](https://travis-ci.org/fshchudlo/right-angled)
[![Dependency Status](https://david-dm.org/fshchudlo/right-angled.svg)](https://david-dm.org/fshchudlo/right-angled)
[![devDependency Status](https://david-dm.org/fshchudlo/right-angled/dev-status.svg)](https://david-dm.org/fshchudlo/right-angled#info=devDependencies)
[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

Добро пожаловать на страницу right-angled - адаптер библиотеки [e2e4](https://github.com/fshchudlo/e2e4) для построения списков в [Angular 2](https://github.com/angular/angular) приложениях.

## Смысл существования данного проекта
Данная библиотека представляет собой набор директив и компонентов для построения функциональных списков, а так же реализации selection-функционала, не привязанного непосредственно к спискам.
Основная идея данной библиотеки - ненавязчивость, которая достигается следующими способами:
- Отсутствие тяжелых настроек - вместо настройки сортировок, столбцов, источников данных и т.д. (как это делается, например, [в Kendo UI](http://demos.telerik.com/kendo-ui/grid/index)) - декларативная разметка.
- Отсутствие стилей и минимальные ограничения по структуре верстки, чтобы вы смогли использовать те верстку и стили, которые нужны вам, а не мучались со стилизацией наших компонент. 
- Никаких тяжелых настроек data source - все, что требуется, чтобы список заработал - указать метод, возвращающий данные.