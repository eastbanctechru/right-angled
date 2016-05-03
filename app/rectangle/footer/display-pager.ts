import {Component, KeyValueDiffers, KeyValueDiffer, ChangeDetectorRef} from 'angular2/core';
import {RtList} from '../lists/list';
import {NgBufferedListService} from '../bootstrap/ngBufferedListService';
import {ProgressState} from 'e2e4/src/common/progressState';
import {RtStatusControlBase} from './status-control-base';

@Component({
    selector: 'rt-display-pager',
    template: `<div *ngIf="isVisible"><ng-content></ng-content></div>`
})
export class RtDisplayPager extends RtStatusControlBase {
    changeDetectorRef: ChangeDetectorRef;
    checkPagerChangesBinded: () => void;
    pagerDiffer: KeyValueDiffer;
    constructor(listHost: RtList, differs: KeyValueDiffers, changeDetectorRef: ChangeDetectorRef) {
        super(listHost, differs, ProgressState.Done);
        this.changeDetectorRef = changeDetectorRef;
        this.checkPagerChangesBinded = this.checkPagerChanges.bind(this);
        this.pagerDiffer = differs.find([]).create(null);
    }
    ngOnDestroy(): void {
        super.ngOnDestroy();
        delete this.checkPagerChangesBinded;
    }
    ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChangesBinded);
        }
    }
    checkStateChanges(item: any): void {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    checkPagerChanges(item: any): void {
        if (item.key === 'totalCount' || (this.listHost.isBufferedList && item.key === 'skip')) {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.changeDetectorRef.detectChanges();
        let isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.totalCount !== 0;
        if (this.listHost.isBufferedList) {
            isVisible = isVisible && (<NgBufferedListService>this.listHost.serviceInstance).pager.skip < this.listHost.serviceInstance.pager.totalCount;
        }
        this.isVisible = isVisible;
    }
}
