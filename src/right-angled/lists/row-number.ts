import {SkipSelf, Component, Input, OnChanges} from '@angular/core';
import {RtListComponent} from './list';
import {NgPagedListService} from '../bootstrap/ngPagedListService';

@Component({
    selector: 'rt-row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class RtRowNumberComponent implements OnChanges {
    @Input() index: number;
    rowNumber: number;
    listHost: RtListComponent;
    constructor(@SkipSelf()listHost: RtListComponent) {
        this.listHost = listHost;
    }
    ngOnChanges(): void {
        if (this.listHost.isRegularList || this.listHost.isBufferedList) {
            this.rowNumber = this.index + 1;
        } else if (this.listHost.isPagedList) {
            this.rowNumber = this.index + (<NgPagedListService>this.listHost.serviceInstance).pager.displayFrom;
        }
    }
}
