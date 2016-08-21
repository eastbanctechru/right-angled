import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { SortDirection } from 'right-angled';
import { Airport }     from './airport';
import { LookupItem } from './lookup-item';
import { PagedListRequest, BufferedListRequest, ListRequest, ListResponse, PagedListResponse } from 'right-angled';
import { AirportsPagedListRequest, AirportsBufferedListRequest, AirportsListRequest } from './airports-list-request';

@Injectable()
export class AirportsService {
    public static maxPageSize: number = 200;
    constructor(private http: Http) {

    }
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

    private getFilteredAirports(request: AirportsListRequest | AirportsBufferedListRequest | AirportsPagedListRequest, delay: number): Observable<Array<Airport>> {
        return this.getAirports(delay).map(airports => {
            return _.chain(airports)
                .filter(item => !request.airportName || item.name.toLowerCase().indexOf(request.airportName.toLowerCase()) !== -1)
                .filter(item => request.size === null || (item.size === null && request.size === '') || item.size === request.size)
                .filter(item => !request.type || item.type === request.type)
                .filter(item => !request.regionName || item.region === request.regionName)
                .filter(item => !request.cityName || item.cityName === request.cityName)
                .filter(item => !request.countryName || item.countryName === request.countryName)
                .forEach(item => { (item as any).selected = false; })
                .value();
        });
    }
    public getAirportsPaged(request: AirportsPagedListRequest, delay: number = 500): Observable<PagedListResponse<Airport>> {
        return this.getFilteredAirports(request, delay).map(airports => this.applyPagedRequest(request, airports));
    }
    public getAirportsBuffered(request: AirportsBufferedListRequest, delay: number = 500): Observable<ListResponse<Airport>> {
        return this.getFilteredAirports(request, delay).map(airports => this.applyBufferedRequest(request, airports));
    }
    public getAirportsRegular(request: AirportsListRequest, delay: number = 500): Observable<ListResponse<Airport>> {
        return this.getFilteredAirports(request, delay).map(airports => this.applyRequest(request, airports));
    }
    public getAirportsGroupedByRegion(request: AirportsListRequest, delay: number = 500): Observable<ListResponse<Airport>> {
        return this.getFilteredAirports(request, delay).map(airports => {
            let result = this.applyRequest(request, airports) as ListResponse<any>;
            result.items = _.chain(result.items)
                .groupBy(item => item.region)
                .map((item, index) => { return { airports: item, name: index, selected: false }; })
                .orderBy(region => region.name)
                .value();
            return result;
        });
    }
    private transformToLookup(data: Array<string>): Array<LookupItem> {
        return _.chain(data).map(value => {
            return {
                key: value === null ? '' : value,
                value: value === null ? '-unspecified-' : value
            } as LookupItem;
        }).concat([{
            key: null,
            value: ''
        } as LookupItem]).orderBy(item => item.value).value();
    }
    private getAirports(delay: number): Observable<Array<Airport>> {
        return this.http.get('/live-demo/shared/data/airports.json').map(response => {
            return response.json().airports as Array<Airport>;
        }).delay(delay)
            // use share to avoid multiple calls by angular async pipes
            .share();
    }
    public getAirportTypes(delay: number = 500): Observable<Array<LookupItem>> {
        return this.getAirports(500).map(airports => this.transformToLookup(_.chain(airports).map(item => item.type).uniq().value()));
    }
    public getAirportSizes(delay: number = 500): Observable<Array<LookupItem>> {
        return this.getAirports(500).map(airports => this.transformToLookup(_.chain(airports).map(item => item.size).uniq().value()));
    }
    public getRegions(delay: number = 500): Observable<Array<LookupItem>> {
        return this.getAirports(500).map(airports => this.transformToLookup(_.chain(airports).map((item: Airport) => item.region).uniq().value()));
    }
    public getCountries(region?: string, delay: number = 500): Observable<Array<LookupItem>> {
        return this.getAirports(delay)
            .map(airports => this.transformToLookup(
                _.chain(airports)
                    .filter(item => !region || item.region === region)
                    .map((item: Airport) => item.countryName).uniq()
                    .value()));
    }
    public getCities(country?: string, delay: number = 500): Observable<Array<LookupItem>> {
        return this.getAirports(delay)
            .map(airports => this.transformToLookup(
                _.chain(airports)
                    .filter(item => !country || item.countryName === country)
                    .map((item: Airport) => item.cityName).uniq()
                    .value()));
    }
    public getCountryInfo(countryName: string, delay: number = 500): Observable<any> {
        return this.http.get(`https://restcountries.eu/rest/v1/name/${countryName}`).map(response => {
            return response.json();
        }).delay(delay);
    }
}
