# [9.0.0](https://github.com/eastbanctechru/right-angled/compare/v8.1.0...v9.0.0) (2019-02-16)

`e2e4` library removed from dependencies.

### Breaking changes

To migrate your project to latest version you need to remove `e2e4` dependency. All imports from `e2e4` replaced with new services from `right-angled`. For example `PagedPager` must be replaced with `RTPagedPager`, `FiltersService` must be replaced with `RTFiltersService` etc.
Public contract is basically the same.

### Features

Most of public APIs supplemented with `Observable` alternatiives to support `OnPush` change detection. For example, previously `RTList` provides `items` array, now it also has `items$` property which is implemented as `Observable`. See demo-application for more details.

# [8.1.0](https://github.com/eastbanctechru/right-angled/compare/v8.0.0...v8.1.0) (2019-02-16)

### Features

-   **list:** Small fixes to play well with Angular CDK Virtual Scroll ([09c02f6](https://github.com/eastbanctechru/right-angled/commit/09c02f6)), closes [#104](https://github.com/eastbanctechru/right-angled/issues/104)
-   **package:** Library is now distibuted with support of Angular package format (APF) ([3841562](https://github.com/eastbanctechru/right-angled/commit/3841562))

# [8.0.0](https://github.com/eastbanctechru/right-angled/compare/v7.1.0...v8.0.0) (2018-12-07)

### Features

-   **all:** Updated to Angular v.7 ([8a4113a](https://github.com/eastbanctechru/right-angled/commit/8a4113a))

<a name="7.1.0"></a>

# [7.1.0](https://github.com/eastbanctechru/right-angled/compare/v7.0.1...v7.1.0) (2018-09-22)

### Features

-   **sort:** Add ability to remove sortings ([a45f1b2](https://github.com/eastbanctechru/right-angled/commit/a45f1b2))

<a name="7.0.1"></a>

## [7.0.1](https://github.com/eastbanctechru/right-angled/compare/v7.0.0...v7.0.1) (2018-09-18)

### Bug Fixes

-   **list:** Make `sortingsService` property of `rtList` directive public ([c7de934](https://github.com/eastbanctechru/right-angled/commit/c7de934))

<a name="7.0.0"></a>

# [7.0.0](https://github.com/eastbanctechru/right-angled/compare/v6.0.0...v7.0.0) (2018-08-07)

### Code Refactoring

-   **list:** `on` prefix is removed form events names according to style guide ([6b6781f](https://github.com/eastbanctechru/right-angled/commit/6b6781f))

### Features

-   **list:** `onLoadStarted` event added ([3558f0a](https://github.com/eastbanctechru/right-angled/commit/3558f0a))

### BREAKING CHANGES

-   **list:** `on` prefix is removed from events names according to style guide

<a name="6.0.0"></a>

# [6.0.0](https://github.com/eastbanctechru/right-angled/compare/v2.0.1...v6.0.0) (2018-05-24)

### Bug Fixes

-   **build:** remove linebreak rule ([0ec0a84](https://github.com/eastbanctechru/right-angled/commit/0ec0a84))

### Features

-   **all:** Updated to Angular/RxJS v.6 ([8e93dba](https://github.com/eastbanctechru/right-angled/commit/8e93dba))

<a name="2.0.1"></a>

## [2.0.1](https://github.com/eastbanctechru/right-angled/compare/v2.0.0...v2.0.1) (2018-01-01)

<a name="2.0.0"></a>

# [2.0.0](https://github.com/eastbanctechru/right-angled/compare/v1.4.2...v2.0.0) (2017-11-07)

### Features

-   **all:** Package update to angular@5.x.x ([1386b06](https://github.com/eastbanctechru/right-angled/commit/1386b06))

### BREAKING CHANGES

-   **all:** Minimal required version of Angular is 5.x.x
