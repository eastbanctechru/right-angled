import { Airport } from './airport';
import { LookupItem } from './lookup-item';

export interface AirportsResponse {
    airports: Airport[];
    sizes: LookupItem[];
    types: LookupItem[];
    countries: string[];
    airportsTree: any[];
}
