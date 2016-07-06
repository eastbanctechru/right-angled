import { SkipSelf, Directive, HostListener, HostBinding, KeyValueDiffers } from '@angular/core';

import { ListComponent } from '../list.component';
import { Defaults } from './defaults';
import { LoadDataDirective } from './load-data.directive';

@Directive({
    // tslint:disable-next-line: directive-selector-name
    selector: 'input[rtLoadData], button[rtLoadData]'
})
export class LoadDataButtonDirective extends LoadDataDirective {
    @HostBinding('title')
    public title: string;
    @HostBinding('class.' + Defaults.classNames.loadButtonLoad)
    public displyLoadCls: boolean;
    @HostBinding('class.' + Defaults.classNames.loadButtonCancel)
    public displayCancelCls: boolean;
    @HostBinding('value')
    public value: string;
    constructor( @SkipSelf() hostList: ListComponent, differs: KeyValueDiffers) {
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
