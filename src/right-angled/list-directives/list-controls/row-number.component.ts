import { SkipSelf, Component, Input, OnChanges } from '@angular/core';

import { ListComponent } from '../list.component';
import { NgPagedListService } from '../../services/ng-paged-list-service.service';

@Component({
    selector: 'rt-row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class RowNumberComponent implements OnChanges {
    private listHost: ListComponent;
    @Input() public index: number;
    private rowNumber: number;
    constructor( @SkipSelf() listHost: ListComponent) {
        this.listHost = listHost;
    }
    public ngOnChanges(): void {
        if (this.listHost.isRegularList || this.listHost.isBufferedList) {
            this.rowNumber = this.index + 1;
        } else if (this.listHost.isPagedList) {
            this.rowNumber = this.index + (<NgPagedListService>this.listHost.serviceInstance).pager.displayFrom;
        }
    }
}