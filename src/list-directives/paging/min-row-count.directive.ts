import { Directive, Input, OnChanges, SimpleChange, SkipSelf } from '@angular/core';
import { BufferedPager } from 'e2e4';

@Directive({
    selector: '[rtMinRowCount]'
})
export class MinRowCountDirective implements OnChanges {
    @Input('rtMinRowCount') public minRowCount: number;
    constructor( @SkipSelf() private pager: BufferedPager) {
    }
    public ngOnChanges(changes: { minRowCount?: SimpleChange }): void {
        if (changes.minRowCount) {
            this.pager.minRowCount = changes.minRowCount.currentValue * 1;
        }
    }
}
