<a name="0.28.4"></a>
# [0.28.4](https://github.com/fshchudlo/right-angled/compare/0.28.3...v0.28.4) (2016-10-15)


### Features

* **all:** updated to angular 2.1.0 ([deeaa52](https://github.com/fshchudlo/right-angled/commit/deeaa52))



<a name="0.28.3"></a>
# [0.28.3](https://github.com/fshchudlo/right-angled/compare/0.28.2...v0.28.3) (2016-10-14)


### Features

* **list controls:** `RtReloadData` directive added ([b63de6a](https://github.com/fshchudlo/right-angled/commit/b63de6a))



<a name="0.28.2"></a>
## [0.28.2](https://github.com/fshchudlo/right-angled/compare/0.28.1...v0.28.2) (2016-10-11)



<a name="0.28.1"></a>
# [0.29.0](https://github.com/fshchudlo/right-angled/compare/0.28.0...v0.28.1) (2016-10-11)


### Features

* **listDirective:** `onServiceInited` event added ([1d52715](https://github.com/fshchudlo/right-angled/commit/1d52715))



<a name="0.28.0"></a>
# [0.28.0](https://github.com/fshchudlo/right-angled/compare/0.27.0...v0.28.0) (2016-10-10)


### Code Refactoring

* **selection:** Selection completely refactored ([71e2408](https://github.com/fshchudlo/right-angled/commit/71e2408))


### BREAKING CHANGES

* selection: `rtSelectionAreaFor` is now `rtSelectionArea` without any params. `rtSelectByIndex` is replaced by `rtSelectable`



<a name="0.27.0"></a>
# [0.27.0](https://github.com/fshchudlo/right-angled/compare/0.26.0...v0.27.0) (2016-10-07)


### Code Refactoring

* **List:** `ListComponent` is now directive ([03cb8ca](https://github.com/fshchudlo/right-angled/commit/03cb8ca))


### BREAKING CHANGES

* List: `rt-list` component now becomes `rtList` directive with fetch method as parameter

instead of separate option as was before



<a name="0.26.0"></a>
# [0.26.0](https://github.com/fshchudlo/right-angled/compare/0.25.2...v0.26.0) (2016-10-06)


### Code Refactoring

* **state services:** rename `registerPersistenceService` to `registerStateService` ([2ed3f02](https://github.com/fshchudlo/right-angled/commit/2ed3f02))


### Features

* **list service:** `getRequestState` method added ([5a05313](https://github.com/fshchudlo/right-angled/commit/5a05313))


### BREAKING CHANGES

* state services: `registerPersistenceService` renamed to `registerStateService`.

`RtStateService.getPersistedState` renamed to `RtStateService.getState`



<a name="0.25.2"></a>
## [0.25.2](https://github.com/fshchudlo/right-angled/compare/0.25.1...v0.25.2) (2016-10-04)


### Bug Fixes

* **listService:** fix `registerFilterTarget` and `removeFilterTarget` delegation ([9b66dc1](https://github.com/fshchudlo/right-angled/commit/9b66dc1))



<a name="0.25.1"></a>
## [0.25.1](https://github.com/fshchudlo/right-angled/compare/0.25.0...v0.25.1) (2016-10-04)


### Bug Fixes

* **ListComponent:** Execute list `init` with `setTimeout` ([b08c5d4](https://github.com/fshchudlo/right-angled/commit/b08c5d4))



<a name="0.25.0"></a>
# [0.25.0](https://github.com/fshchudlo/right-angled/compare/0.24.0...v0.25.0) (2016-10-04)


### Features

* **RtListService:** encapsulate `RtListService` services ([8a7adad](https://github.com/fshchudlo/right-angled/commit/8a7adad))


### BREAKING CHANGES

* RtListService: `RtListService.sortingsService` and `RtListService.filtersService` becomes private.

Use  angular DI instead.



<a name="0.24.0"></a>
# [0.24.0](https://github.com/fshchudlo/right-angled/compare/0.23.0...0.24.0) (2016-10-04)


### Code Refactoring

* **state management:** make `RtListService.stateServices` private ([9505259](https://github.com/fshchudlo/right-angled/commit/9505259))


### BREAKING CHANGES

* state management: `RtPersistenceService` renamed to `RtStateService`. `RtListService.stateServices`

becomes private



<a name="0.23.0"></a>
# [0.23.0](https://github.com/fshchudlo/right-angled/compare/0.22.2...v0.23.0) (2016-10-04)


### Bug Fixes

* **selection:** check that items parameter is array ([1ecb56c](https://github.com/fshchudlo/right-angled/commit/1ecb56c))


### Features

* **List:** `onServiceInit` event added ([aa89959](https://github.com/fshchudlo/right-angled/commit/aa89959))



<a name="0.22.2"></a>
## [0.22.2](https://github.com/fshchudlo/right-angled/compare/0.22.1...v0.22.2) (2016-10-03)



<a name="0.22.1"></a>
## [0.22.1](https://github.com/fshchudlo/right-angled/compare/0.22.0...v0.22.1) (2016-10-03)


### Bug Fixes

* **all:** e2e4 version update ([d138a94](https://github.com/fshchudlo/right-angled/commit/d138a94))



<a name="0.22.0"></a>
# [0.22.0](https://github.com/fshchudlo/right-angled/compare/0.21.0...v0.22.0) (2016-10-03)


### Features

* **lists:** list now can handle simple array as response ([4ff15c6](https://github.com/fshchudlo/right-angled/commit/4ff15c6))



<a name="0.21.0"></a>
# [0.21.0](https://github.com/fshchudlo/right-angled/compare/0.20.0...v0.21.0) (2016-09-30)


### Features

* **all:** e2e4 version update ([e13194f](https://github.com/fshchudlo/right-angled/commit/e13194f))
* **paging:** listService pager now can be setted dynamically ([879872d](https://github.com/fshchudlo/right-angled/commit/879872d))
* **paging:** pagers components implemented ([d768b22](https://github.com/fshchudlo/right-angled/commit/d768b22))



<a name="0.20.0"></a>
# [0.20.0](https://github.com/fshchudlo/right-angled/compare/0.19.2...v0.20.0) (2016-09-29)


### Bug Fixes

* **lyfecicle:** correct order of default values/custom controls values/persistence services values application ([496fa14](https://github.com/fshchudlo/right-angled/commit/496fa14))


### Features

* **persistence:** `registerPersistenceService` function defined in `RTListsModule` and `RTModule` ([56a6188](https://github.com/fshchudlo/right-angled/commit/56a6188))



<a name="0.19.2"></a>
## [0.19.2](https://github.com/fshchudlo/right-angled/compare/0.19.1...v0.19.2) (2016-09-27)


### Bug Fixes

* **paging:** change `attr.disabled` to 'disabled' for input controls ([8415a9b](https://github.com/fshchudlo/right-angled/commit/8415a9b))



<a name="0.19.1"></a>
## [0.19.1](https://github.com/fshchudlo/right-angled/compare/0.19.0...v0.19.1) (2016-09-25)


### Bug Fixes

* **package:** [@angular](https://github.com/angular) rollback to 2.0.0 ([2033ec0](https://github.com/fshchudlo/right-angled/commit/2033ec0))



<a name="0.19.0"></a>
# [0.19.0](https://github.com/fshchudlo/right-angled/compare/0.18.1...v0.19.0) (2016-09-25)


### Bug Fixes

* **buffered paging:** doesn't handle input events if disabled ([96f0075](https://github.com/fshchudlo/right-angled/commit/96f0075))
* **page size:** correct validation of pageSize and takeRowCount value ([41a93c2](https://github.com/fshchudlo/right-angled/commit/41a93c2))


### Features

* **paging:** options controls added ([ec2572a](https://github.com/fshchudlo/right-angled/commit/ec2572a))
* **sortings:** rtDefaultSortings directive ([aafa114](https://github.com/fshchudlo/right-angled/commit/aafa114))



<a name="0.18.1"></a>
# [0.18.1](https://github.com/fshchudlo/right-angled/compare/0.18.0...v0.18.1) (2016-09-24)


### Features

* **list components:** make `pager` property public ([2aa7d94](https://github.com/fshchudlo/right-angled/commit/2aa7d94))
* **rt-display-pager:** make `pager` public ([7740ebe](https://github.com/fshchudlo/right-angled/commit/7740ebe))



<a name="0.18.0"></a>
# [0.18.0](https://github.com/fshchudlo/right-angled/compare/0.17.0...v0.18.0) (2016-09-23)


### Bug Fixes

* **modules:** rename `RTListModule` to `RTListsModule` ([a739d4d](https://github.com/fshchudlo/right-angled/commit/a739d4d))


### Features

* **list components:** method `reloadData` added to component ([b65b1da](https://github.com/fshchudlo/right-angled/commit/b65b1da))



