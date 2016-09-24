import { Directive, Input, OnChanges, SimpleChange, SkipSelf } from '@angular/core';
import { BufferedPager } from 'e2e4';

@Directive({
    selector: '[rtDefaultRowCount]'
})
export class DefaultRowCountDirective implements OnChanges {
    @Input('rtDefaultRowCount') public defaultRowCount: number;
    constructor( @SkipSelf() private pager: BufferedPager) {
    }
    public ngOnChanges(changes: { defaultRowCount?: SimpleChange }): void {
        if (changes.defaultRowCount) {
            this.pager.defaultRowCount = changes.defaultRowCount.currentValue * 1;
        }
    }
}
