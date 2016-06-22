import {Injectable} from '@angular/core';
import {airports}     from './airports';
import * as _ from 'lodash';
import {SortDirection} from 'e2e4';

@Injectable()
export class AirportsService {
    static maxPageSize: number = 200;
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
        let fieldNames = request.sort.map((sort) => { return sort.fieldName; });
        let directions = request.sort.map((sort) => { return sort.direction === SortDirection.Asc ? 'asc' : 'desc'; });
        response.items = _.orderBy(data, fieldNames, directions);
        return response;
    }
    getAirportsPaged(request: any): Promise<any> {
        let data = _.filter(airports, item => !request.airportName || (item.name && item.name.indexOf(request.airportName) !== -1));

        let result = this.applyPagedRequest(request, data);
        result.items.forEach(item => item.selected = false);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(result);
            }, 500);
        });
    }
    getAirportsBuffered(request: any): Promise<any> {
        let data = _.filter(airports, item => !request.airportName || (item.name && item.name.indexOf(request.airportName) !== -1));
        let result = this.applyBufferedRequest(request, data);
        result.items.forEach(item => item.selected = false);
        return new Promise(resolve => {
            setTimeout(() => { resolve(result); }, 500);
        });
    }
    getAirportsRegular(request: any): Promise<any> {
        let data = _.filter(airports, item => !request.airportName || (item.name && item.name.indexOf(request.airportName) !== -1));

        let result = this.applyRequest(request, data);
        result.items.forEach(item => item.selected = false);
        return new Promise(resolve => {
            setTimeout(() => { resolve(result); }, 500);
        });
    }
}
