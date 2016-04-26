import {Directive, Input, HostBinding, KeyValueDiffers} from 'angular2/core';
import {ListComponent} from './list.component';
import {Defaults} from '../defaults';
import {LoadControlBaseDirective} from './load-control-base.directive';

@Directive({
    host: {
        '(click)': 'loadData()'
    },
    selector: 'input[rt-load-button], button[rt-load-button]'
})
export class LoadControlButtonDirective extends LoadControlBaseDirective {
    constructor(hostList: ListComponent, differs: KeyValueDiffers) {
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
    setAttributes(): void {
        super.setAttributes();
        this.value = this.listHost.serviceInstance.busy ? Defaults.messages.loadButtonCancelRequest : Defaults.messages.loadButtonLoad;
    }
}
