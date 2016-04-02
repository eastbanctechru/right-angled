System.register(['lodash', 'e2e4/src/common/sortDirection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _, sortDirection_1;
    var ListComponentService;
    return {
        setters:[
            function (_1) {
                _ = _1;
            },
            function (sortDirection_1_1) {
                sortDirection_1 = sortDirection_1_1;
            }],
        execute: function() {
            ListComponentService = (function () {
                function ListComponentService() {
                    this.items = [
                        {
                            id: 1,
                            title: 'one'
                        },
                        {
                            id: 2,
                            title: 'two'
                        },
                        {
                            id: 3,
                            title: 'three'
                        },
                        {
                            id: 4,
                            title: 'four'
                        },
                        {
                            id: 5,
                            title: 'five'
                        },
                        {
                            id: 5,
                            title: 'one'
                        },
                        {
                            id: 4,
                            title: 'two'
                        },
                        {
                            id: 3,
                            title: 'three'
                        },
                        {
                            id: 2,
                            title: 'four'
                        },
                        {
                            id: 1,
                            title: 'five'
                        }
                    ];
                }
                ListComponentService.prototype.getData = function (request) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            var fieldNames = request.sort.map(function (sort) { return sort.fieldName; });
                            var directions = request.sort.map(function (sort) { return sort.direction === sortDirection_1.SortDirection.Asc ? 'asc' : 'desc'; });
                            var data = _.orderBy(_this.items, fieldNames, directions);
                            var res = {
                                items: data,
                                loadedCount: data.length,
                                totalCount: _this.items.length
                            };
                            resolve(res);
                        }, 0);
                    });
                };
                return ListComponentService;
            }());
            exports_1("ListComponentService", ListComponentService);
        }
    }
});
//# sourceMappingURL=baseListService.js.map