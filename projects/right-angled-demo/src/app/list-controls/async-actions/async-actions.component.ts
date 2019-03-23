import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OperationStatus } from 'right-angled';
import { Observable, Subscriber } from 'rxjs';
import { AirportsPagedListRequest, AirportsService, ListResponse } from '../../shared';
import { first } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-async-actions',
    templateUrl: 'async-actions.component.html'
})
export class AsyncActionsComponent {
    public lastRequestParams: AirportsPagedListRequest = null;
    public subscriber: Subscriber<ListResponse> = null;
    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsPagedListRequest): Observable<ListResponse> => {
        this.lastRequestParams = request;
        return new Observable<ListResponse>(subscriber => (this.subscriber = subscriber));
    };

    public cancelRequest(): void {
        this.subscriber.next({
            items: [],
            status: OperationStatus.Cancelled,
            totalCount: 0
        });
        this.subscriber.complete();
        this.subscriber = null;
    }

    public failRequest(): void {
        this.subscriber.next({
            items: [],
            status: OperationStatus.Fail,
            totalCount: 0
        });
        this.subscriber.complete();
        this.subscriber = null;
    }

    public continueRequest(): void {
        this.subscriber.next({
            items: [],
            status: OperationStatus.Progress,
            totalCount: 0
        });
    }

    public completeRequest(): void {
        this.airportsService
            .getAirportsPagedList(this.lastRequestParams, 0)
            .pipe(first())
            .subscribe(response => {
                this.subscriber.next(response);
                this.subscriber.complete();
                this.subscriber = null;
            });
    }
}
