<a name="1.1.0-beta.0"></a>
# [1.1.0-beta.0](https://github.com/eastbanctechru/right-angled/compare/v1.0.0...v1.1.0-beta.0) (2017-04-14)


### Features

* **all:** reorganize internal structure ([2eb5e91](https://github.com/eastbanctechru/right-angled/commit/2eb5e91))
* **package:** library package now meets angular best practices ([d8dfd68](https://github.com/eastbanctechru/right-angled/commit/d8dfd68))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-rc.0...v1.0.0) (2017-04-11)


### Features

* **all:** `e2e4` version update ([3db1e0d](https://github.com/eastbanctechru/right-angled/commit/3db1e0d))



<a name="1.0.0-rc.0"></a>
# [1.0.0-rc.0](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-beta.6...v1.0.0-rc.0) (2017-04-11)


### Features

* **list:** `keepRecordsOnLoad` option implemented ([0fb2d83](https://github.com/eastbanctechru/right-angled/commit/0fb2d83))



<a name="1.0.0-beta.6"></a>
# [1.0.0-beta.6](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2017-03-27)


### Bug Fixes

* **aot:** AOT compilation fixed ([f15332b](https://github.com/eastbanctechru/right-angled/commit/f15332b))



<a name="1.0.0-beta.5"></a>
# [1.0.0-beta.5](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2017-03-26)


### Features

* **all:** `e2e4` version updated ([bef69b7](https://github.com/eastbanctechru/right-angled/commit/bef69b7))
* **all:** update `angular` to 4.0 ([88db919](https://github.com/eastbanctechru/right-angled/commit/88db919))



<a name="1.0.0-beta.4"></a>
# [1.0.0-beta.4](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2017-03-11)


### Features

* **list:** `loadData` now return result of `fetchMethod` execution ([ad0aac8](https://github.com/eastbanctechru/right-angled/commit/ad0aac8))
* **package:** e2e4 version updated ([a45239e](https://github.com/eastbanctechru/right-angled/commit/a45239e))



<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2016-12-21)


### Features

* **all:** systemjs support added ([3e5229c](https://github.com/eastbanctechru/right-angled/commit/3e5229c))
* **package:** `e2e4` version update ([e8ec615](https://github.com/eastbanctechru/right-angled/commit/e8ec615))
* **package:** update `angular` to 2.4.0 ([de5415b](https://github.com/eastbanctechru/right-angled/commit/de5415b))
* **paging:** `rtInfinite` directive implemented to add infinite scrolling to the lists ([a2710a5](https://github.com/eastbanctechru/right-angled/commit/a2710a5))



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2016-12-09)


### Code Refactoring

* **status controls:** status controls decoupled from `RtList` service and can use any object with `RTOperationStatus` contract now ([7ec5312](https://github.com/eastbanctechru/right-angled/commit/7ec5312))

### Features

* **async operations:** `AsyncSubscriber` replaced with new class from `e2e4` with support of promise rejections ([02fa75b](https://github.com/eastbanctechru/right-angled/commit/02fa75b))
* **filters:** `RTFilterTarget` opaque token added to register filter targets with DI ([2da3fb7](https://github.com/eastbanctechru/right-angled/commit/2da3fb7))
* **package:** `angular` updated to 2.3.0 ([8652562](https://github.com/eastbanctechru/right-angled/commit/8652562))
* **selection:** `SelectableDirective` now sets css class on element selection/deselection ([5fcbb3a](https://github.com/eastbanctechru/right-angled/commit/5fcbb3a))
* **selection:** two-way data binding [(selected)] added to `rtSelectable` and `rtSelectionCheckbox` directives ([54f9218](https://github.com/eastbanctechru/right-angled/commit/54f9218))


### BREAKING CHANGES

* paging controls: call of `loadData` on `Enter` key press deleted from `rtPageSize`, `rtPageNumber` and `rtRowCount` directives to achieve single responsibility. You can use `loadData` and `loadMore` pagers methods of in your component templates instead.
* all: `Rt` prefixes changed to `RT` in all services names
* status controls: All `rt-list-state-...` components renamed to `rt-status-...` since they now decoupled from `RTList` service
* lists: `RTList.state` property renamed to `status` to avoid collisions with state management functionality
* async operations: `ProgressState` enum renamed to `OperationStatus` in `e2e4` library

<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/eastbanctechru/right-angled/compare/1.0.0-beta.0...v1.0.0-beta.1) (2016-11-29)


### Bug Fixes

* **selection:** call `stopPropagation` and `preventDefault` functions with proper context ([bc613e0](https://github.com/eastbanctechru/right-angled/commit/bc613e0)), closes [#81](https://github.com/eastbanctechru/right-angled/issues/81)



<a name="1.0.0-beta.0"></a>
project moved to beta status
