import { Headers, RequestMethod } from '@angular/http';

export interface RequestSettings {
    url: string;
    method?: string | RequestMethod;
    headers?: Headers | { [key: string]: any };
    data?: any;
}
