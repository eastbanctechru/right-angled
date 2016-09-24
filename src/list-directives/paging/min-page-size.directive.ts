import { Directive, Input, OnChanges, SimpleChange, SkipSelf } from '@angular/core';
import { PagedPager } from 'e2e4';

@Directive({
    selector: '[rtMinPageSize]'
})
export class MinPageSizeDirective implements OnChanges {
    @Input('rtMinPageSize') public minPageSize: number;
    constructor( @SkipSelf() private pager: PagedPager) {
    }
    public ngOnChanges(changes: { minPageSize?: SimpleChange }): void {
        if (changes.minPageSize) {
            this.pager.minPageSize = changes.minPageSize.currentValue * 1;
        }
    }
}
