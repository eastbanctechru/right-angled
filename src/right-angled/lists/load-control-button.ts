import { SkipSelf, Directive, HostListener, HostBinding, KeyValueDiffers } from '@angular/core';
import { RtListComponent } from './list';
import { Defaults } from '../defaults';
import { RtLoadControlBaseDirective } from './load-control-base';

@Directive({
    /* tslint:disable:directive-selector-prefix */
    /* tslint:disable:directive-selector-type */
    /* tslint:disable:directive-selector-name */
    selector: 'input[rt-load-button], button[rt-load-button]'
    /* tslint:ensable:directive-selector-prefix */
    /* tslint:ensable:directive-selector-type */
    /* tslint:ensable:directive-selector-name */
})
export class RtLoadControlButtonDirective extends RtLoadControlBaseDirective {
    @HostBinding('title')
    public title: string;
    @HostBinding('class.' + Defaults.classNames.loadButtonLoad)
    public displyLoadCls: boolean;
    @HostBinding('class.' + Defaults.classNames.loadButtonCancel)
    public displayCancelCls: boolean;
    @HostBinding('value')
    public value: string;
    constructor( @SkipSelf() hostList: RtListComponent, differs: KeyValueDiffers) {
        super(hostList, differs);
    }
    @HostListener('click')
    public loadData(): void {
        super.loadData();
    }
    public setAttributes(): void {
        super.setAttributes();
        this.value = this.listHost.serviceInstance.busy ? Defaults.messages.loadButtonCancelRequest : Defaults.messages.loadButtonLoad;
    }
}
