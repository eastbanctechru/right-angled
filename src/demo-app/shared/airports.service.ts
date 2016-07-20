import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { SelectableItem, SortParameter, SortDirection } from 'right-angled';

import { AirportInfo, airports }     from './airports';

@Injectable()
export class AirportsService {
    public static maxPageSize: number = 200;
    private applyBufferedRequest(request: any, data: any[]): any {
        let response = this.applyRequest(request, data);
        let take = request.take > AirportsService.maxPageSize ? AirportsService.maxPageSize : request.take;
        response.items = _.slice(response.items, request.skip, request.skip + take);
        response.loadedCount = response.items.length;
        return response;
    }
    private applyPagedRequest(request: any, data: any[]): any {
        let response = this.applyRequest(request, data);
        let pageSize = request.pageSize > AirportsService.maxPageSize ? AirportsService.maxPageSize : request.pageSize;
        let skip = (request.pageNumber - 1) * pageSize;
        response.displayFrom = skip + 1;
        response.displayTo = (response.displayFrom + pageSize > response.totalCount) ? response.totalCount : response.displayFrom + pageSize - 1;
        response.items = _.slice(response.items, skip, skip + pageSize);
        response.loadedCount = response.items.length;
        return response;
    }
    private applyRequest(request: any, data: any[]): any {
        let response = {
            loadedCount: data.length,
            totalCount: data.length
        };
        return this.applySortings(request, response, data);
    }
    private applySortings(request: any, response: any, data: any[]): any {
        let fieldNames = request.sort.map((sort: SortParameter) => { return sort.fieldName; });
        let directions = request.sort.map((sort: SortParameter) => { return sort.direction === SortDirection.Asc ? 'asc' : 'desc'; });
        response.items = _.orderBy(data, fieldNames, directions);
        return response;
    }
    public getAirportsPaged(request: any): Promise<any> {
        let data = _.filter(airports, (item: AirportInfo) => !request.airportName || (item.name && item.name.indexOf(request.airportName) !== -1));

        let result = this.applyPagedRequest(request, data);
        result.items.forEach((item: SelectableItem) => item.selected = false);
        return new Promise((resolve: Function, reject: Function): void => {
            setTimeout(() => {
                resolve(result);
            }, 500);
        });
    }
    public getAirportsBuffered(request: any): Promise<any> {
        let data = _.filter(airports, (item: AirportInfo) => !request.airportName || (item.name && item.name.indexOf(request.airportName) !== -1));
        let result = this.applyBufferedRequest(request, data);
        result.items.forEach((item: SelectableItem) => item.selected = false);
        return new Promise((resolve: Function): void => {
            setTimeout(() => { resolve(result); }, 500);
        });
    }
    public getAirportsRegular(request: any): Promise<any> {
        let data = _.filter(airports, (item: AirportInfo) => !request.airportName || (item.name && item.name.indexOf(request.airportName) !== -1));

        let result = this.applyRequest(request, data);
        result.items.forEach((item: SelectableItem) => item.selected = false);
        return new Promise((resolve: Function): void => {
            setTimeout(() => { resolve(result); }, 500);
        });
    }
    public getAirportsGroupedByContinent(request: any): Promise<any> {
        let data = _.filter(airports, (item: AirportInfo) => !request.airportName || (item.name && item.name.indexOf(request.airportName) !== -1));

        let result = this.applyRequest(request, data);
        result.items.forEach((item: SelectableItem) => item.selected = false);
        result.items = _.chain(result.items)
            .groupBy((item: AirportInfo) => item.continent)
            .map((item: AirportInfo, index: number) => { return { items: item, name: index, selected: false }; })
            .orderBy((continent: any) => continent.name)
            .value();
        return new Promise((resolve: Function): void => {
            setTimeout(() => { resolve(result); }, 500);
        });
    }
}
