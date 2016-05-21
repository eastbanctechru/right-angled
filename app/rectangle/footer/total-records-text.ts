import {Component, Input, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {NgPagedListService} from '../bootstrap/ngPagedListService';
import {RtList} from '../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';
import {Defaults} from '../defaults';

@Component({
    selector: 'rt-total-records-text',
    template: `<span *ngIf="isVisible">{{text}}</span>`
})
export class RtTotalRecordsText implements DoCheck, OnDestroy, OnInit {
    static formatString(format: string, ...args: any[]): string {
        let s = arguments[0];
        for (let i = 0; i < arguments.length - 1; i++) {
            let reg = new RegExp('\\{' + i + '\\}', 'gm');
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }
    checkListChangesBinded: (item: any) => void;
    checkSelfChangesBinded: (item: any) => void;
    checkPagerChangesBinded: (item: any) => void;
    listDiffer: KeyValueDiffer;
    selfDiffer: KeyValueDiffer;
    pagerDiffer: KeyValueDiffer;
    @Input('text') textInput;
    isVisible: boolean;
    text: string;
    listHost: RtList;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        this.listDiffer = differs.find([]).create(null);
        this.selfDiffer = differs.find([]).create(null);
        this.pagerDiffer = differs.find([]).create(null);
        this.listHost = listHost;
        this.checkListChangesBinded = this.checkListChanges.bind(this);
        this.checkSelfChangesBinded = this.checkSelfChanges.bind(this);
        this.checkPagerChangesBinded = this.checkPagerChanges.bind(this);
    }
    ngOnInit(): void {
        this.setVisibility();
        this.setDisplayText();
    }
    ngOnDestroy(): void {
        delete this.checkListChangesBinded;
        delete this.checkSelfChangesBinded;
        delete this.checkPagerChangesBinded;
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkListChangesBinded);
        }
        let selfDiff = this.selfDiffer.diff(this);
        if (selfDiff) {
            selfDiff.forEachChangedItem(this.checkSelfChangesBinded);
        }
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChangesBinded);
        }
    }
    checkListChanges(item: any): void {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    checkPagerChanges(item: any): void {
        if (item.key === 'totalCount') {
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
            this.text = RtTotalRecordsText.formatString(this.textInput || Defaults.messages.simpleListTotalRecordsText, this.listHost.serviceInstance.pager.loadedCount);
        } else if (this.listHost.isBufferedList) {
            this.text = RtTotalRecordsText.formatString(this.textInput || Defaults.messages.bufferedListTotalRecordsText, this.listHost.serviceInstance.pager.loadedCount, this.listHost.serviceInstance.pager.totalCount);
        } else if (this.listHost.isPagedList) {
            this.text = RtTotalRecordsText.formatString(this.textInput || Defaults.messages.pagedListTotalRecordsText, (<NgPagedListService>this.listHost.serviceInstance).pager.displayFrom, (<NgPagedListService>this.listHost.serviceInstance).pager.displayTo, this.listHost.serviceInstance.pager.totalCount);
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.totalCount !== 0;
    }
}
