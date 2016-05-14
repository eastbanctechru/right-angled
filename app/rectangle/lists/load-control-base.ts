import {Directive, Input, HostBinding, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {RtList} from './list';
import {Defaults} from '../defaults';

@Directive({
    host: {
        '(click)': 'loadData()'
    },
    selector: '[rt-load-button]:not(input), [rt-load-button]:not(button)'
})
export class RtLoadControlBase implements DoCheck, OnDestroy, OnInit {
    checkBusyFlagChangedBinded: (item: any) => void;
    listDiffers: KeyValueDiffer;
    listHost: RtList;
    @HostBinding('title')
    title: string;
    @HostBinding('class.' + Defaults.classNames.loadButtonLoad)
    displyLoadCls: boolean;
    @HostBinding('class.' + Defaults.classNames.loadButtonCancel)
    displayCancelCls: boolean;

    constructor(hostList: RtList, differs: KeyValueDiffers) {
        this.listHost = hostList;
        this.listDiffers = differs.find([]).create(null);
        this.checkBusyFlagChangedBinded = this.checkStatusChanges.bind(this);
    }
    ngOnInit(): void {
        this.setAttributes();
    }
    ngOnDestroy(): void {
        delete this.checkBusyFlagChangedBinded;
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffers.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkBusyFlagChangedBinded);
        }
    }
    checkStatusChanges(item: any): void {
        if (item.key === 'state') {
            this.setAttributes();
        }
    }
    setAttributes(): void {
        this.title = this.listHost.serviceInstance.busy ? Defaults.messages.loadButtonCancelRequest : Defaults.messages.loadButtonLoad;
        this.displyLoadCls = !this.listHost.serviceInstance.busy;
        this.displayCancelCls = this.listHost.serviceInstance.busy;
    }
    loadData(): void {
        this.listHost.serviceInstance.reloadData();
    }
}
