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
* lists: `RTListюstate` property renamed to `status` to avoid collisions with state management functionality
* async operations: `ProgressState` enum renamed to `OperationStatus` in `e2e4` library

<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/eastbanctechru/right-angled/compare/1.0.0-beta.0...v1.0.0-beta.1) (2016-11-29)


### Bug Fixes

* **selection:** call `stopPropagation` and `preventDefault` functions with proper context ([bc613e0](https://github.com/eastbanctechru/right-angled/commit/bc613e0)), closes [#81](https://github.com/eastbanctechru/right-angled/issues/81)



<a name="1.0.0-beta.0"></a>
project moved to beta status