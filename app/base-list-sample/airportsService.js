System.register(['angular2/core', '../airports', 'lodash', 'e2e4/src/common/sortDirection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, airports_1, _, sortDirection_1;
    var AirportsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (airports_1_1) {
                airports_1 = airports_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (sortDirection_1_1) {
                sortDirection_1 = sortDirection_1_1;
            }],
        execute: function() {
            AirportsService = (function () {
                function AirportsService() {
                }
                AirportsService.prototype.applyBufferedRequest = function (request, data) {
                    var response = this.applyRequest(request, data);
                    var take = request.take > AirportsService.maxPageSize ? AirportsService.maxPageSize : request.take;
                    response.items = _.slice(response.items, request.skip, request.skip + take);
                    response.loadedCount = response.items.length;
                    return response;
                };
                AirportsService.prototype.applyPagedRequest = function (request, data) {
                    var response = this.applyRequest(request, data);
                    var pageSize = request.pageSize > AirportsService.maxPageSize ? AirportsService.maxPageSize : request.pageSize;
                    var skip = (request.pageNumber - 1) * pageSize;
                    response.displayFrom = skip + 1;
                    response.displayTo = (response.displayFrom + pageSize > response.totalCount) ? response.totalCount : response.displayFrom + pageSize - 1;
                    response.items = _.slice(response.items, skip, skip + pageSize);
                    response.loadedCount = response.items.length;
                    return response;
                };
                AirportsService.prototype.applyRequest = function (request, data) {
                    var response = {
                        totalCount: data.length
                    };
                    return this.applySortings(request, response, data);
                };
                AirportsService.prototype.applySortings = function (request, response, data) {
                    var fieldNames = request.sort.map(function (sort) { return sort.fieldName; });
                    var directions = request.sort.map(function (sort) { return sort.direction === sortDirection_1.SortDirection.Asc ? 'asc' : 'desc'; });
                    response.items = _.orderBy(data, fieldNames, directions);
                    return response;
                };
                AirportsService.prototype.getAirportsPaged = function (request) {
                    var result = this.applyPagedRequest(request, airports_1.airports);
                    return Promise.resolve(result);
                };
                AirportsService.maxPageSize = 200;
                AirportsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AirportsService);
                return AirportsService;
            }());
            exports_1("AirportsService", AirportsService);
        }
    }
});
//# sourceMappingURL=airportsService.js.map