import {Component, Input, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit} from '@angular/core';
import {NgPagedListService} from '../bootstrap/ngPagedListService';
import {RtListComponent} from '../lists/list';
import {ProgressState} from 'e2e4';
import {Defaults} from '../defaults';

@Component({
    selector: 'rt-total-records-text',
    template: `<span *ngIf="isVisible">{{text}}</span>`
})
export class RtTotalRecordsTextComponent implements DoCheck, OnInit {
    static formatString(format: string, ...args: any[]): string {
        let s = arguments[0];
        for (let i = 0; i < arguments.length - 1; i++) {
            let reg = new RegExp('\\{' + i + '\\}', 'gm');
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }
    listDiffer: KeyValueDiffer;
    selfDiffer: KeyValueDiffer;
    pagerDiffer: KeyValueDiffer;
    @Input('text') textInput;
    isVisible: boolean;
    text: string;
    listHost: RtListComponent;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers) {
        this.listDiffer = differs.find([]).create(null);
        this.selfDiffer = differs.find([]).create(null);
        this.pagerDiffer = differs.find([]).create(null);
        this.listHost = listHost;
    }
    ngOnInit(): void {
        this.setVisibility();
        this.setDisplayText();
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkListChanges);
        }
        let selfDiff = this.selfDiffer.diff(this);
        if (selfDiff) {
            selfDiff.forEachChangedItem(this.checkSelfChanges);
        }
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanges);
        }
    }
    checkListChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    checkPagerChanges = (item: any): void => {
        if (item.key === 'totalCount') {
            this.setVisibility();
        }
        if (item.key === 'loadedCount') {
            this.setDisplayText();
        }
    }
    checkSelfChanges = (item: any): void => {
        if (item.key === 'text') {
            this.setDisplayText();
        }
    }
    setDisplayText(): void {
        if (this.listHost.isSimpleList) {
            this.text = RtTotalRecordsTextComponent.formatString(this.textInput || Defaults.messages.simpleListTotalRecordsText, this.listHost.serviceInstance.pager.loadedCount);
        } else if (this.listHost.isBufferedList) {
            this.text = RtTotalRecordsTextComponent.formatString(this.textInput || Defaults.messages.bufferedListTotalRecordsText, this.listHost.serviceInstance.pager.loadedCount, this.listHost.serviceInstance.pager.totalCount);
        } else if (this.listHost.isPagedList) {
            this.text = RtTotalRecordsTextComponent.formatString(this.textInput || Defaults.messages.pagedListTotalRecordsText, (<NgPagedListService>this.listHost.serviceInstance).pager.displayFrom, (<NgPagedListService>this.listHost.serviceInstance).pager.displayTo, this.listHost.serviceInstance.pager.totalCount);
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.totalCount !== 0;
    }
}
