import { Directive, Input, OnChanges, SimpleChange, SkipSelf } from '@angular/core';
import { BufferedPager } from 'e2e4';

@Directive({
    selector: '[rtMaxRowCount]'
})
export class MaxRowCountDirective implements OnChanges {
    @Input('rtMaxRowCount') public maxRowCount: number;
    constructor( @SkipSelf() private pager: BufferedPager) {
    }
    public ngOnChanges(changes: { maxRowCount?: SimpleChange }): void {
        if (changes.maxRowCount) {
            this.pager.maxRowCount = changes.maxRowCount.currentValue * 1;
        }
    }
}
