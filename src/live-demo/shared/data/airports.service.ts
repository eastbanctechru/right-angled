import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { SortDirection } from 'right-angled';
import { Airport }     from './airport';
import { airports }     from './airports';
import { LookupItem } from './lookup-item';
import { PagedListRequest, BufferedListRequest, ListRequest, ListResponse, PagedListResponse } from 'right-angled';
import { AirportsPagedListRequest, AirportsBufferedListRequest, AirportsListRequest } from './airports-list-request';

@Injectable()
export class AirportsService {
    public static maxPageSize: number = 200;
    private applyBufferedRequest(request: BufferedListRequest, data: Airport[]): ListResponse<Airport> {
        let response = this.applyRequest(request, data);
        let take = request.take > AirportsService.maxPageSize ? AirportsService.maxPageSize : request.take;
        response.items = _.slice(response.items, request.skip, request.skip + take);
        response.loadedCount = response.items.length;
        return response;
    }
    private applyPagedRequest(request: PagedListRequest, data: Airport[]): PagedListResponse<Airport> {
        let response = this.applyRequest(request, data) as PagedListResponse<Airport>;
        let pageSize = request.pageSize > AirportsService.maxPageSize ? AirportsService.maxPageSize : request.pageSize;
        let skip = (request.pageNumber - 1) * pageSize;
        response.displayFrom = skip + 1;
        response.displayTo = (response.displayFrom + pageSize > response.totalCount) ? response.totalCount : response.displayFrom + pageSize - 1;
        response.items = _.slice(response.items, skip, skip + pageSize);
        response.loadedCount = response.items.length;
        return response;
    }
    private applyRequest(request: ListRequest, data: Airport[]): ListResponse<Airport> {
        let response = {
            loadedCount: data.length,
            totalCount: data.length
        } as ListResponse<Airport>;
        return this.applySortings(request, response, data);
    }
    private applySortings(request: ListRequest, response: ListResponse<Airport>, data: Airport[]): ListResponse<Airport> {
        let fieldNames = request.sort.map(sort => { return sort.fieldName; });
        let directions = request.sort.map(sort => { return sort.direction === SortDirection.Asc ? 'asc' : 'desc'; });
        response.items = _.orderBy(data, fieldNames, directions);
        return response;
    }

    private getFilteredArray(request: AirportsListRequest | AirportsBufferedListRequest | AirportsPagedListRequest): Array<Airport> {
        let filteredItems = _.chain(airports)
            .filter(item => !request.airportName || item.name.toLowerCase().indexOf(request.airportName.toLowerCase()) !== -1)
            .filter(item => request.size === null || (item.size === null && request.size === '') || item.size === request.size)
            .filter(item => !request.type || item.type === request.type)
            .forEach(item => { (item as any).selected = false; })
            .value();
        return filteredItems;
    }
    public getAirportsPaged(request: AirportsPagedListRequest): Observable<PagedListResponse<Airport>> {
        let result = this.applyPagedRequest(request, this.getFilteredArray(request));
        return this.toObservable(result);
    }
    public getAirportsBuffered(request: AirportsBufferedListRequest): Observable<ListResponse<Airport>> {
        let data = this.getFilteredArray(request);
        let result = this.applyBufferedRequest(request, data);
        return this.toObservable(result);
    }
    public getAirportsRegular(request: AirportsListRequest): Observable<ListResponse<Airport>> {
        let data = this.getFilteredArray(request);
        let result = this.applyRequest(request, data);
        return this.toObservable(result);
    }
    public getAirportsGroupedByContinent(request: AirportsListRequest): Observable<ListResponse<Airport>> {
        let data = this.getFilteredArray(request);

        let result = this.applyRequest(request, data) as ListResponse<any>;
        result.items = _.chain(result.items)
            .groupBy(item => item.continent)
            .map((item, index) => { return { airports: item, name: index, selected: false }; })
            .orderBy(continent => continent.name)
            .value();
        return this.toObservable(result);
    }
    private transformToLookup(data: Array<string>): Array<LookupItem> {
        return _.chain(data).map(size => {
            return {
                key: '',
                value: size === null ? '-unspecified-' : size
            } as LookupItem;
        }).concat([{
            key: null,
            value: ''
        } as LookupItem]).orderBy(item => item.value).value();
    }
    private toObservable(data: any): Observable<any> {
        return Observable.create((observer) => {
            setTimeout(() => {
                observer.next(data);
                observer.complete();
            }, 500);
        });
    }

    public getCountries(): Observable<Array<LookupItem>> {
        return this.toObservable(this.transformToLookup(_.chain(airports).map(item => item.iso).uniq().value()));
    }
    public getAirportTypes(): Observable<Array<LookupItem>> {
        return this.toObservable(this.transformToLookup(_.chain(airports).map(item => item.type).uniq().value()));
    }
    public getAirportSizes(): Observable<Array<LookupItem>> {
        return this.toObservable(this.transformToLookup(_.chain(airports).map(item => item.size).uniq().value()));
    }
    public getAirportContinents(): Observable<Array<LookupItem>> {
        return this.toObservable(this.transformToLookup(_.chain(airports).map(item => item.continent).uniq().value()));
    }
}
