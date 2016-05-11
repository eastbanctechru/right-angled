import * as _ from 'lodash';
import { EventEmitter } from 'angular2/core';
import { Http, RequestOptionsArgs, RequestMethod, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import './cancelOn';

export interface RequestSettings {
    url: string,
    method?: string | RequestMethod;
    headers?: Headers | { [key: string]: any };
    data?: any;
}

export abstract class DataService {

    protected _disposeEvent = new EventEmitter<any>();
    
    public faultHandlers: Array<(response: Response) => boolean> = [];

    constructor(protected _http: Http)
    {
        _.bindAll(this, 'faultHandler');
        this.faultHandlers.push(this.notFoundHandler);
    }

    protected callService<T>(settings: RequestSettings): Promise<T> {
        let callSettings = this.toRequestOptionsArgs(settings);

        let obs = this._http.request(settings.url, callSettings)
            .map<T>(response => response.json())
            .catch(this.faultHandler)
            .cancelOn(this._disposeEvent);

        return obs.toPromise();
    }

    dispose(): void {
        this._disposeEvent.emit(null);
    }
    
    protected faultHandler(response: Response): Observable<any> {
        for (var i = 0; i < this.faultHandlers.length; i++) {
            if (this.faultHandlers[i](response) === false) {
                break;
            }
        }
        return Observable.throw(response.json());
    }
    
    protected notFoundHandler(response: Response): boolean {
        // TODO: move magic numbers to HttpStatuses enum.
        if (response.status === 404) {
            // TODO: move notification messages to localizationManager.
            console.error('not found.');
            return false;
        }
        return true;
    }

    private toRequestOptionsArgs(settings: RequestSettings): RequestOptionsArgs {
        // create headers object
        let headers = new Headers(settings.headers);
        if (!headers.has('Content-Type')) {
            headers.append('Content-Type', 'application/json; charset=utf-8');
        }

        // set body and search values
        let body: string = null;
        let search: string = null;
        if (!!settings.data) {
            if (settings.method === RequestMethod.Get || settings.method === 'GET') {
                search = this.objectToQuerySearch(settings.data);
            } else {
                body = JSON.stringify(settings.data);
            }
        }

        let callSettings: RequestOptionsArgs = {
            method: settings.method || RequestMethod.Post,
            url: settings.url,
            body: body,
            search: search,
            headers: headers
        };

        return callSettings;
    }

    private objectToQuerySearch(obj: any, prefix?: string): string {
        var result: string[] = [];
        for (var prop in obj) {
            var value: any = obj[prop];
            if (!_.isUndefined(value) && !_.isNull(value)) {
                if (!_.isObject(value)) {
                    var key = encodeURIComponent(!prefix ? prop : `${prefix}[${prop}]`);
                    var val = encodeURIComponent(value);
                    result.push(`${key}=${val}`);
                } else {
                    if (value instanceof Array) {
                        var array: string[] = _.map(value, (e, idx) => this.objectToQuerySearch(e, !prefix ? `${prop}[${idx}]` : `${prefix}[${prop}][${idx}]`));
                        result = _.union(result, array);
                    } else if (_.isPlainObject(value)) {
                        result.push(this.objectToQuerySearch(value));
                    }
                }
            }
        }
        return result.join('&');
    }
}
