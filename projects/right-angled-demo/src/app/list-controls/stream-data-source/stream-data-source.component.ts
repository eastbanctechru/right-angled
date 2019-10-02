import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-stream-data-source',
    templateUrl: 'stream-data-source.component.html'
})
export class StreamDataSourceComponent {
    public appendStreamedData = false;
    constructor() {}
    public getList(): Observable<number[]> {
        return interval(1000).pipe(map(i => [i, i + 1, i + 2]));
    }
}
