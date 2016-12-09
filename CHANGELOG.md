<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/eastbanctechru/right-angled/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2016-12-09)


### Code Refactoring

* **all:** `Rt` prefix changed to `RT` prefix in all services names ([fd0b116](https://github.com/eastbanctechru/right-angled/commit/fd0b116))
* **lists:** `RtList` now extends `List` service from e2e4 library instead of own implementation ([8f1c95c](https://github.com/eastbanctechru/right-angled/commit/8f1c95c))
* **paging controls:** `loadData` call on `Enter` key press deleted from `rtPageSize`, `rtPageNu ([278362f](https://github.com/eastbanctechru/right-angled/commit/278362f))
* **status controls:** status controls decoupled from `RtList`. Now they can use any object with ([7ec5312](https://github.com/eastbanctechru/right-angled/commit/7ec5312))


### Features

* **async operations:** `AsyncSubscriber` replaced with new class from `e2e4` library which supports ([02fa75b](https://github.com/eastbanctechru/right-angled/commit/02fa75b))
* **filters:** `RTFilterTarget` opaque token added to register filter targets with DI ([2da3fb7](https://github.com/eastbanctechru/right-angled/commit/2da3fb7))
* **package:** `angular` updated to 2.3.0 ([8652562](https://github.com/eastbanctechru/right-angled/commit/8652562))
* **package:** changelog generation added ([55bf18b](https://github.com/eastbanctechru/right-angled/commit/55bf18b))
* **selection:** `SelectableDirective` sets css class on element selection/deselection ([5fcbb3a](https://github.com/eastbanctechru/right-angled/commit/5fcbb3a))
* **selection:** two-way data binding [(selected)] added to `rtSelectable` and `rtSelectionCheckbox` ([54f9218](https://github.com/eastbanctechru/right-angled/commit/54f9218))


### BREAKING CHANGES

* paging controls: `loadData` call on `Enter` key press deleted from `rtPageSize`, `rtPageNumber` and

`rtRowCount` directives. You can use `loadData` and `loadMore` methods of pagers in your component

template instead
* all: `Rt` prefix changed to `RT` prefix in all services names
* selection: insead of `selected` flag in your models use [(selected)] data binding wand bind it

to any property of your models
* status controls: All `rt-list-state-...` components renamed to `rt-status-...` since they now

decoupled from `RtList`
* lists: RtList `state` property renamed to `status` to avoid collisions with state

management functionality
* async operations: `ProgressState` enum renamed to `OperationStatus` in `e2e4` lib



<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/eastbanctechru/right-angled/compare/1.0.0-beta.0...v1.0.0-beta.1) (2016-11-29)


### Bug Fixes

* **selection:** call `stopPropagation` and `preventDefault` functions with proper context ([bc613e0](https://github.com/eastbanctechru/right-angled/commit/bc613e0)), closes [#81](https://github.com/eastbanctechru/right-angled/issues/81)



<a name="1.0.0-beta.0"></a>
project moved to beta status