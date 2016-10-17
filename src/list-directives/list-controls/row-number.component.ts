import { ChangeDetectionStrategy, Component, Input, OnChanges, SkipSelf } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtListService } from '../list-service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-row-number',
    template: `{{rowNumber}}`
})
export class RowNumberComponent implements OnChanges {
    @Input() public index: number;
    private rowNumber: number;
    constructor( @SkipSelf() private listService: RtListService) {
    }
    public ngOnChanges(): void {
        if (this.index !== 0 && (!this.index || isNaN(this.index))) {
            throw new Error('Invalid parameter "index" for rt-row-number component. Provide a valid numeric value.');
        }
        if (this.listService.pager !== null && (<PagedPager>this.listService.pager).displayFrom) {
            this.rowNumber = this.index + (<PagedPager>this.listService.pager).displayFrom;
        } else {
            this.rowNumber = this.index + 1;
        }
    }
}
