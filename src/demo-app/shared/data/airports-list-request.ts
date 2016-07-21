import { PagedListRequest, BufferedListRequest, ListRequest } from 'right-angled';
export interface AirportsPagedListRequest extends PagedListRequest {
    airportName: string;
    type: string;
    size: string;
}
export interface AirportsBufferedListRequest extends BufferedListRequest {
    airportName: string;
    type: string;
    size: string;
}
export interface AirportsListRequest extends ListRequest {
    airportName: string;
    type: string;
    size: string;
}
