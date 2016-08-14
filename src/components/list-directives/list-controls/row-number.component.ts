import { SkipSelf, Component, Input, OnChanges } from '@angular/core';

import { RtNullObjectInjectable, RtPagedPager, RtBufferedPager, RtRegularPager } from '../../providers/index';

@Component({
    selector: 'rt-row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class RowNumberComponent implements OnChanges {
    @Input() public index: number;
    private rowNumber: number;
    constructor( @SkipSelf() private pagedPager: RtPagedPager, @SkipSelf() private bufferedPager: RtBufferedPager, @SkipSelf() private regularPager: RtRegularPager) {
    }
    public ngOnChanges(): void {
        if (this.regularPager !== RtNullObjectInjectable.instance || this.bufferedPager !== RtNullObjectInjectable.instance) {
            this.rowNumber = this.index + 1;
        } else if (this.pagedPager !== RtNullObjectInjectable.instance) {
            this.rowNumber = this.index + this.pagedPager.displayFrom;
        }
    }
}
