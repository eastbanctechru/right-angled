import {Component, Input, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy} from 'angular2/core';
import {ListComponent} from '../lists/list.component';
import {ProgressState} from 'e2e4/src/common/progressState';
import {Utility} from 'e2e4/src/common/utility';
import {Defaults} from '../defaults';

@Component({
    selector: 'rt-total-records-text',
    template: `<span *ngIf="isVisible">{{displayText}}</span>`
})
export class TotalRecordsTextComponent implements DoCheck, OnDestroy {
    checkListChangesBinded: (item: any) => void;
    checkSelfChangesBinded: (item: any) => void;
    listDiffers: KeyValueDiffer;
    selfDiffers: KeyValueDiffer;
    @Input() text;
    isVisible: boolean;
    displayText: string;
    listHost: ListComponent;
    constructor(listHost: ListComponent, differs: KeyValueDiffers) {
        this.listDiffers = differs.find([]).create(null);
        this.selfDiffers = differs.find([]).create(null);
        this.listHost = listHost;
        this.checkListChangesBinded = this.checkListChanges.bind(this);
        this.checkSelfChangesBinded = this.checkSelfChanges.bind(this);
        this.setVisibility();
        this.setDisplayText();
    }
    ngOnDestroy(): void {
        delete this.checkListChangesBinded;
        delete this.checkSelfChangesBinded;
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffers.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkListChangesBinded);
        }
        let selfDiff = this.selfDiffers.diff(this);
        if (selfDiff) {
            selfDiff.forEachChangedItem(this.checkSelfChangesBinded);
        }
    }
    checkListChanges(item: any): void {
        if (item.key === 'state' || item.key === 'totalCount') {
            this.setVisibility();
        }
        if (item.key === 'loadedCount') {
            this.setDisplayText();
        }
    }
    checkSelfChanges(item: any): void {
        if (item.key === 'text') {
            this.setDisplayText();
        }
    }
    setDisplayText(): void {
        this.displayText = Utility.formatString(this.text || Defaults.footerMessages.listTotalRecordsText, this.listHost.serviceInstance.loadedCount);
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.totalCount !== 0;
    }
}
