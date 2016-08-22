import { SkipSelf, Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { BufferedPager, PagedPager, RegularPager } from 'e2e4';
import { RtNullObjectInjectable } from '../null-object-injectable';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-row-number',
    template: `{{rowNumber}}`
})
export class RowNumberComponent implements OnChanges {
    @Input() public index: number;
    private rowNumber: number;
    constructor( @SkipSelf() private pagedPager: PagedPager, @SkipSelf() private bufferedPager: BufferedPager, @SkipSelf() private regularPager: RegularPager) {
    }
    public ngOnChanges(): void {
        if (this.regularPager !== RtNullObjectInjectable.instance || this.bufferedPager !== RtNullObjectInjectable.instance) {
            this.rowNumber = this.index + 1;
        } else if (this.pagedPager !== RtNullObjectInjectable.instance) {
            this.rowNumber = this.index + this.pagedPager.displayFrom;
        }
    }
}
