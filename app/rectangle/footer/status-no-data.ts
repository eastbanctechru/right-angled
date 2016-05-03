import {Component, KeyValueDiffers, KeyValueDiffer} from 'angular2/core';
import {RtList} from '../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';
import {RtStatusControlBase} from './status-control-base';

@Component({
    selector: 'rt-status-no-data',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class RtStatusNoData extends RtStatusControlBase {
    checkLoadedCountChangesBinded: () => void;
    pagerDiffer: KeyValueDiffer;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
        this.checkLoadedCountChangesBinded = this.checkLoadedCountChanges.bind(this);
    }
    ngOnDestroy(): void {
        super.ngOnDestroy();
        delete this.checkLoadedCountChangesBinded;
    }
    ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkLoadedCountChangesBinded);
        }
    }
    checkLoadedCountChanges(item: any): void {
        if (item.key === 'loadedCount') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.loadedCount === 0;
    }
}
