import { Directive, Input, OnChanges, SimpleChange, SkipSelf } from '@angular/core';
import { SortParameter } from 'e2e4';

import { RtListService } from '../list-service';

@Directive({
    selector: '[rtDefaultSortings]'
})
export class DefaultSortingsDirective implements OnChanges {
    @Input('rtDefaultSortings') public defaultSortings: Array<SortParameter>;
    constructor( @SkipSelf() private listService: RtListService) {
    }
    public ngOnChanges(changes: { defaultSortings?: SimpleChange }): void {
        if (changes.defaultSortings) {
            this.listService.sortingsService.defaultSortings = changes.defaultSortings.currentValue;
        }
    }
}
