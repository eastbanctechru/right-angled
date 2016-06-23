import {SkipSelf, Directive, HostBinding, HostListener, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit} from '@angular/core';
import {RtListComponent} from './list';
import {Defaults} from '../defaults';

@Directive({
    /* tslint:disable:directive-selector-name */
    selector: '[rt-load-button]:not(input), [rt-load-button]:not(button)'
    /* tslint:enable:directive-selector-name */
})
export class RtLoadControlBaseDirective implements DoCheck, OnInit {
    listDiffers: KeyValueDiffer;
    listHost: RtListComponent;
    @HostBinding('title')
    title: string;
    @HostBinding('class.' + Defaults.classNames.loadButtonLoad)
    displyLoadCls: boolean;
    @HostBinding('class.' + Defaults.classNames.loadButtonCancel)
    displayCancelCls: boolean;

    constructor(@SkipSelf()hostList: RtListComponent, differs: KeyValueDiffers) {
        this.listHost = hostList;
        this.listDiffers = differs.find([]).create(null);
    }
    ngOnInit(): void {
        this.setAttributes();
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffers.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkStatusChanges);
        }
    }
    checkStatusChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setAttributes();
        }
    }
    setAttributes(): void {
        this.title = this.listHost.serviceInstance.busy ? Defaults.messages.loadButtonCancelRequest : Defaults.messages.loadButtonLoad;
        this.displyLoadCls = !this.listHost.serviceInstance.busy;
        this.displayCancelCls = this.listHost.serviceInstance.busy;
    }
    @HostListener('click')
    loadData(): void {
        this.listHost.serviceInstance.reloadData();
    }
}
