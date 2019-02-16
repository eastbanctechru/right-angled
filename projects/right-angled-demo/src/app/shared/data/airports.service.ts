import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Airport } from './airport';
import { AirportsListRequest } from './airports-list-request';
import { AirportsPagedListRequest } from './airports-paged-list-request';
import { AirportsResponse } from './airports-response';
import { ListResponse } from './list-response';
import { LookupItem } from './lookup-item';
import { SortDirection, SortParameter } from './sort-parameter';

@Injectable()
export class AirportsService {
    private airportsUrl = './assets/airports.json';
    private responseCache: ReplaySubject<AirportsResponse> = new ReplaySubject<AirportsResponse>(1);
    constructor(private http: HttpClient) {}
    public getAirportsList(request: AirportsListRequest, delayTime: number = 600, itemsCount: number = 5): Observable<Airport[]> {
        return this.getResponse().pipe(
            delay(delayTime),
            map((response: AirportsResponse) => response.airports),
            map((airports: Airport[]) => this.applyFilters(request, airports)),
            map((airports: Airport[]) => this.applySortings(request, airports)),
            map((airports: Airport[]) => airports.slice(0, itemsCount)),
            map((airports: Airport[]) => airports.map(airport => ({ ...airport })))
        );
    }
    public getAirportsPagedList(request: AirportsPagedListRequest, delayTime: number = 600): Observable<ListResponse> {
        return this.getResponse().pipe(
            delay(delayTime),
            map((response: AirportsResponse) => response.airports),
            map((airports: Airport[]) => this.applyFilters(request, airports)),
            map((airports: Airport[]) => this.applySortings(request, airports)),
            map((airports: Airport[]) => this.applyPaging(request, airports)),
            map((response: ListResponse) => {
                response.items = response.items.map(airport => ({ ...airport }));
                return response;
            })
        );
    }
    public getAirportsListChunk(request: AirportsPagedListRequest, delayTime: number = 600): Observable<Airport[]> {
        return this.getResponse().pipe(
            delay(delayTime),
            map((response: AirportsResponse) => response.airports),
            map((airports: Airport[]) => this.applyFilters(request, airports)),
            map((airports: Airport[]) => this.applySortings(request, airports)),
            map((airports: Airport[]) => this.applyPaging(request, airports)),
            map((response: ListResponse) => response.items.map(airport => ({ ...airport })))
        );
    }
    public getSomeCountries(countriesCount: number = 5, delayTime: number = 0): Observable<any[]> {
        return this.getResponse().pipe(
            delay(delayTime),
            map((response: AirportsResponse) => response.countries),
            map((countryNames: string[]) => countryNames.slice(0, countriesCount).map(countryName => ({ name: countryName })))
        );
    }
    public getRegionsWithCountriesAndAirports(): Observable<any[]> {
        return this.getResponse().pipe(
            map((response: AirportsResponse) =>
                response.airportsTree.map(region => ({
                    countries: region.countries.map(country => ({
                        airports: country.airports.map(airport => ({ ...airport })),
                        name: country.name
                    })),
                    name: region.name
                }))
            )
        );
    }
    public getCountryInfo(countryName: string, delayTime: number = 0): Observable<any> {
        return this.http.get(`https://restcountries.eu/rest/v1/name/${countryName}`).pipe(
            map(response => response[0]),
            delay(delayTime)
        );
    }
    public getAirportTypeLookups(delayTime: number = 0): Observable<LookupItem[]> {
        return this.getResponse().pipe(
            delay(delayTime),
            map((response: AirportsResponse) => response.types)
        );
    }
    public getAirportSizeLookups(delayTime: number = 0): Observable<LookupItem[]> {
        return this.getResponse().pipe(
            delay(delayTime),
            map((response: AirportsResponse) => response.sizes)
        );
    }
    private getResponse(): Observable<AirportsResponse> {
        // we use optional "delay" parameter to simulate backend latency
        // also we "cache" result sunce we get all of the items
        if (!this.responseCache.observers.length) {
            this.responseCache.complete();
            this.responseCache = new ReplaySubject<AirportsResponse>(1);
            this.http.get(this.airportsUrl).subscribe(
                (data: AirportsResponse) => {
                    this.responseCache.next(data);
                },
                error => {
                    this.responseCache.error(error);
                }
            );
        }
        return this.responseCache;
    }

    private applySortings(request: AirportsListRequest, data: Airport[]): Airport[] {
        return request.sortings.length === 0 ? data : data.sort((left, right) => this.sortMultiple(left, right, request.sortings));
    }

    private applyFilters(request: AirportsListRequest, airports: Airport[]): Airport[] {
        return airports
            .filter(item => !request.country || (item.countryName || '').toLowerCase().indexOf(request.country.toLowerCase()) !== -1)
            .filter(item => !request.airportName || item.name.toLowerCase().indexOf(request.airportName.toLowerCase()) !== -1)
            .filter(
                item =>
                    request.airportSize === null ||
                    request.airportSize === undefined ||
                    (item.size === null && request.airportSize === '') ||
                    item.size === request.airportSize
            )
            .filter(item => !request.airportType || item.type === request.airportType);
    }
    private applyPaging(request: AirportsPagedListRequest, airports: Airport[]): ListResponse {
        const skip = request.skip || 0;
        const take = request.take || airports.length;
        const resultRecords = airports.slice(skip, skip + take);

        return {
            items: resultRecords,
            loadedCount: resultRecords.length,
            totalCount: airports.length
        } as ListResponse;
    }
    private sortMultiple(left: any, right: any, sortings: SortParameter[]): number {
        let result = 0;
        let index = 0;
        while (index < sortings.length) {
            const sort = sortings[index];
            result = this.compare(left[sort.fieldName], right[sort.fieldName], sort.direction);
            if (result !== 0) {
                return result;
            }
            index++;
        }
        return result;
    }
    private compare(left: any, right: any, direction: SortDirection): number {
        if (left === right) {
            return 0;
        }
        let result;
        if (left === null || left > right) {
            result = 1;
        }
        if (right === null || right > left) {
            result = -1;
        }
        return direction === SortDirection.Asc ? result : result * -1;
    }
}
