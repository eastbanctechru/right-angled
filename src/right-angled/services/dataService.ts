import {EventEmitter} from '@angular/core';
import {Http, RequestOptionsArgs, RequestMethod, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import './operators/cancelon.augmentation';
import {IRequestSettings} from './iRequestSettings';

export abstract class DataService {

    protected disposeEvent = new EventEmitter<any>();
    public faultHandlers: Array<(response: Response) => boolean> = [];
    protected http: Http;

    constructor(http: Http) {
        this.faultHandler = this.faultHandler.bind(this);
        this.http = http;
        this.faultHandlers.push(this.notFoundHandler);
    }

    protected callService<T>(settings: IRequestSettings): Promise<T> {
        let callSettings = this.toRequestOptionsArgs(settings);

        let obs = this.http.request(settings.url, callSettings)
            .map<T>(response => {
                try {
                    return response.json();
                } catch (e) {
                    return response.text();
                }
            })
            .catch(this.faultHandler)
            .cancelOn(this.disposeEvent);

        return obs.toPromise();
    }

    dispose(): void {
        this.disposeEvent.emit(null);
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
            method: settings.method || RequestMethod.Post,
            search: search,
            url: settings.url
        };

        // Note: angular2 не мержит дефолтные заголовки и кастомные. он просто заменяет дефолтные
        if (!!settings.headers) {
            callSettings.headers = new Headers(settings.headers);
        }

        return callSettings;
    }

    private objectToQuerySearch(obj: any, prefix?: string): string {
        let result: string[] = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                let value: any = obj[prop];
                if (!!value) {
                    if (typeof value !== 'object') {
                        let key = encodeURIComponent(!prefix ? prop : `${prefix}[${prop}]`);
                        let val = encodeURIComponent(value);
                        result.push(`${key}=${val}`);
                    } else {
                        if (value instanceof Array) {
                            let array: string[] = value.map((e, idx) => this.objectToQuerySearch(e, !prefix ? `${prop}[${idx}]` : `${prefix}[${prop}][${idx}]`));
                            result = result.concat(array);
                        } else {
                            result.push(this.objectToQuerySearch(value));
                        }
                    }
                }
            }
        }
        return result.join('&');
    }
}
