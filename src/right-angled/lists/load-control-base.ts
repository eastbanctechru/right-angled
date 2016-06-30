import { SkipSelf, Directive, HostBinding, HostListener, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';
import { RtListComponent } from './list';
import { Defaults } from '../defaults';

@Directive({
    selector: '[rt-load-button]:not(input), [rt-load-button]:not(button)'
})
export class RtLoadControlBaseDirective implements DoCheck, OnInit {
    private listDiffers: KeyValueDiffer;
    public listHost: RtListComponent;
    @HostBinding('title')
    public title: string;
    @HostBinding('class.' + Defaults.classNames.loadButtonLoad)
    public displyLoadCls: boolean;
    @HostBinding('class.' + Defaults.classNames.loadButtonCancel)
    public displayCancelCls: boolean;

    constructor(@SkipSelf()hostList: RtListComponent, differs: KeyValueDiffers) {
        this.listHost = hostList;
        this.listDiffers = differs.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setAttributes();
    }
    public ngDoCheck(): void {
        let listDiff = this.listDiffers.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkStatusChanges);
        }
    }
    protected checkStatusChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setAttributes();
        }
    }
    public setAttributes(): void {
        this.title = this.listHost.serviceInstance.busy ? Defaults.messages.loadButtonCancelRequest : Defaults.messages.loadButtonLoad;
        this.displyLoadCls = !this.listHost.serviceInstance.busy;
        this.displayCancelCls = this.listHost.serviceInstance.busy;
    }
    @HostListener('click')
    public loadData(): void {
        this.listHost.serviceInstance.reloadData();
    }
}
