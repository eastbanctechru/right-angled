import {SkipSelf, Directive, HostListener, HostBinding, KeyValueDiffers} from '@angular/core';
import {RtListComponent} from './list';
import {Defaults} from '../defaults';
import {RtLoadControlBaseDirective} from './load-control-base';

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
    constructor(@SkipSelf()hostList: RtListComponent, differs: KeyValueDiffers) {
        super(hostList, differs);
    }
    @HostBinding('title')
    title: string;
    @HostBinding('class.' + Defaults.classNames.loadButtonLoad)
    displyLoadCls: boolean;
    @HostBinding('class.' + Defaults.classNames.loadButtonCancel)
    displayCancelCls: boolean;
    @HostBinding('value')
    value: string;
    @HostListener('click')
    loadData(): void {
        super.loadData();
    }
    setAttributes(): void {
        super.setAttributes();
        this.value = this.listHost.serviceInstance.busy ? Defaults.messages.loadButtonCancelRequest : Defaults.messages.loadButtonLoad;
    }
}
