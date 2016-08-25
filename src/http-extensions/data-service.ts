import { EventEmitter } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import './operators/cancelon.augmentation';
import { RequestSettings } from './request-settings';

export abstract class DataService {

    protected destroyEvent: EventEmitter<any> = new EventEmitter<any>();
    public faultHandlers: Array<(response: Response) => boolean> = [];

    constructor(protected http: Http) {
        this.faultHandler = this.faultHandler.bind(this);
        this.faultHandlers.push(this.notFoundHandler);
    }

    protected callService<T>(settings: RequestSettings): Promise<T> {
        let callSettings = this.toRequestOptionsArgs(settings);

        let obs = this.http.request(settings.url, callSettings)
            .map<T>((response: any) => {
                try {
                    return response.json();
                } catch (e) {
                    return response.text();
                }
            })
            .catch(this.faultHandler)
            .cancelOn(this.destroyEvent);

        return obs.toPromise();
    }

    public destroy(): void {
        this.destroyEvent.emit(null);
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

    private toRequestOptionsArgs(settings: RequestSettings): RequestOptionsArgs {
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
            body,
            method: settings.method || RequestMethod.Post,
            search,
            url: settings.url
        };

        // Note: angular2 �� ������ ��������� ��������� � ���������. �� ������ �������� ���������
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
