import { AirportsListRequest } from './airports-list-request';

export interface AirportsPagedListRequest extends AirportsListRequest {
    skip: number;
    take: number;
}
