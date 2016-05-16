import * as _ from 'lodash';
import { EventEmitter } from '@angular/core';
import { Http, RequestOptionsArgs, RequestMethod, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import './operators/cancelon.augmentation';
import { IRequestSettings } from './iRequestSettings';

export abstract class DataService {

    protected _disposeEvent = new EventEmitter<any>();
    public faultHandlers: Array<(response: Response) => boolean> = [];
    protected _http: Http;

    constructor(http: Http) {
        _.bindAll(this, 'faultHandler');
        this._http = http;
        this.faultHandlers.push(this.notFoundHandler);
    }

    protected callService<T>(settings: IRequestSettings): Promise<T> {
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
        for (let i = 0; i < this.faultHandlers.length; i++) {
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

    private toRequestOptionsArgs(settings: IRequestSettings): RequestOptionsArgs {
        // Create headers object
        let headers = new Headers(settings.headers);
        if (!headers.has('Content-Type')) {
            headers.append('Content-Type', 'application/json; charset=utf-8');
        }

        // Set body and search values
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
            body: body,
            headers: headers,
            method: settings.method || RequestMethod.Post,
            search: search,
            url: settings.url
        };

        return callSettings;
    }

    private objectToQuerySearch(obj: any, prefix?: string): string {
        let result: string[] = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                let value: any = obj[prop];
                if (!_.isUndefined(value) && !_.isNull(value)) {
                    if (!_.isObject(value)) {
                        let key = encodeURIComponent(!prefix ? prop : `${prefix}[${prop}]`);
                        let val = encodeURIComponent(value);
                        result.push(`${key}=${val}`);
                    } else {
                        if (value instanceof Array) {
                            let array: string[] = _.map(value, (e, idx) => this.objectToQuerySearch(e, !prefix ? `${prop}[${idx}]` : `${prefix}[${prop}][${idx}]`));
                            result = _.union(result, array);
                        } else if (_.isPlainObject(value)) {
                            result.push(this.objectToQuerySearch(value));
                        }
                    }
                }
            }
        }
        return result.join('&');
    }
}
