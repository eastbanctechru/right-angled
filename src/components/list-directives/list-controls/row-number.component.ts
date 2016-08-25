import {  ChangeDetectionStrategy, Component, Input, OnChanges, SkipSelf } from '@angular/core';
import { BufferedPager, PagedPager, RegularPager } from 'e2e4';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: module.id,
    selector: 'rt-row-number',
    template: `{{rowNumber}}`
})
export class RowNumberComponent implements OnChanges {
    @Input() public index: number;
    private rowNumber: number;
    constructor( @SkipSelf() private pagedPager: PagedPager, @SkipSelf() private bufferedPager: BufferedPager, @SkipSelf() private regularPager: RegularPager) {
    }
    public ngOnChanges(): void {
        if (this.regularPager !== null || this.bufferedPager !== null) {
            this.rowNumber = this.index + 1;
        } else if (this.pagedPager !== null) {
            this.rowNumber = this.index + this.pagedPager.displayFrom;
        }
    }
}
