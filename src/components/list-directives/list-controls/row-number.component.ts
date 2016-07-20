import { SkipSelf, Component, Input, OnChanges } from '@angular/core';

import { RtNullObjectInjectableObject, RtPagedPager, RtBufferedPager, RtRegularPager } from '../../services/injectables';

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
        if (this.regularPager !== RtNullObjectInjectableObject.instance && this.bufferedPager !== RtNullObjectInjectableObject.instance) {
            this.rowNumber = this.index + 1;
        } else if (this.pagedPager !== RtNullObjectInjectableObject.instance) {
            this.rowNumber = this.index + this.pagedPager.displayFrom;
        }
    }
}
