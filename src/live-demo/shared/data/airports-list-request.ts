import { BufferedListRequest, ListRequest, PagedListRequest } from 'right-angled';
export interface AirportsPagedListRequest extends PagedListRequest {
    airportName?: string;
    type?: string;
    size?: string;
    countryName?: string;
    cityName?: string;
    regionName?: string;
}
export interface AirportsBufferedListRequest extends BufferedListRequest {
    airportName?: string;
    type?: string;
    size?: string;
    countryName?: string;
    cityName?: string;
    regionName?: string;
}
export interface AirportsListRequest extends ListRequest {
    airportName?: string;
    type?: string;
    size?: string;
    countryName?: string;
    cityName?: string;
    regionName?: string;
}
