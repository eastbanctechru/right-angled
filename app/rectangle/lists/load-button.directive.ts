import {Directive, Input, HostBinding} from 'angular2/core';
import {ListComponent} from './list.component';
import {Defaults} from '../defaults';

@Directive({
    host: {
        '(click)': 'loadData()'
    },
    selector: '[rt-load-button]'
})
export class LoadButtonDirective {
    @Input('load-value') loadValue: string = Defaults.messages.loadButtonLoad;
    @Input('load-title') loadTitle: string = Defaults.messages.loadButtonLoad;
    @Input('cancel-value') cancelValue: string = Defaults.messages.loadButtonCancelRequest;
    @Input('cancel-title') cancelTitle: string = Defaults.messages.loadButtonCancelRequest;
    @Input('load-class-name') loadCls: string = Defaults.classNames.loadButtonLoad;
    @Input('cancel-class-name') cancelCls: string = Defaults.classNames.loadButtonLoad;

    @HostBinding('title')
    get title(): string {
        return this.hostList.serviceInstance.busy ? this.cancelTitle : this.loadTitle;
    }
    @HostBinding('value')
    get value(): string {
        return this.hostList.serviceInstance.busy ? this.cancelValue : this.loadValue;
    }
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
    loadData(): void {
        this.hostList.serviceInstance.reloadData();
    }
}
