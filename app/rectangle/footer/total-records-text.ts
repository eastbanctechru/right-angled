import {Component, Input, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy, OnInit} from 'angular2/core';
import {NgPagedListService} from '../bootstrap/NgPagedListService';
import {RtList} from '../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';
import {Utility} from 'e2e4/src/common/utility';
import {Defaults} from '../defaults';

@Component({
    selector: 'rt-total-records-text',
    template: `<span *ngIf="isVisible">{{text}}</span>`
})
export class RtTotalRecordsText implements DoCheck, OnDestroy, OnInit {
    checkListChangesBinded: (item: any) => void;
    checkSelfChangesBinded: (item: any) => void;
    listDiffers: KeyValueDiffer;
    selfDiffers: KeyValueDiffer;
    @Input('text') textInput;
    isVisible: boolean;
    text: string;
    listHost: RtList;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        this.listDiffers = differs.find([]).create(null);
        this.selfDiffers = differs.find([]).create(null);
        this.listHost = listHost;
        this.checkListChangesBinded = this.checkListChanges.bind(this);
        this.checkSelfChangesBinded = this.checkSelfChanges.bind(this);
    }
    ngOnInit(): void {
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
        if (this.listHost.isSimpleList) {
            this.text = Utility.formatString(this.textInput || Defaults.messages.simpleListTotalRecordsText, this.listHost.serviceInstance.loadedCount);
        } else if (this.listHost.isBufferedList) {
            this.text = Utility.formatString(this.textInput || Defaults.messages.bufferedListTotalRecordsText, this.listHost.serviceInstance.loadedCount, this.listHost.serviceInstance.totalCount);
        } else if (this.listHost.isPagedList) {
            this.text = Utility.formatString(this.textInput || Defaults.messages.pagedListTotalRecordsText, (<NgPagedListService>this.listHost.serviceInstance).displayFrom, (<NgPagedListService>this.listHost.serviceInstance).displayTo, this.listHost.serviceInstance.totalCount);
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.totalCount !== 0;
    }
}
