import { Directive, DoCheck, ElementRef, HostListener, Input, IterableDiffer, IterableDiffers, OnInit, Renderer, SkipSelf } from '@angular/core';
import { SortDirection, SortingsService } from 'e2e4';

import { RtList } from '../core/list';

@Directive({
    selector: '[rtSort]'
})
export class SortDirective implements DoCheck, OnInit {
    public static settings: {
        sortAscClassName: string,
        sortDescClassName: string,
        sortableClassName: string
    } =
    {
        sortAscClassName: 'rt-sort-asc',
        sortDescClassName: 'rt-sort-desc',
        sortableClassName: 'rt-sortable'
    };
    private nativeEl: HTMLElement;
    private sortingsDiffer: IterableDiffer;
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtSort') public fieldName: string;
    constructor( @SkipSelf() private listService: RtList, @SkipSelf() private sortingsService: SortingsService, private renderer: Renderer, el: ElementRef, differs: IterableDiffers) {
        this.sortingsDiffer = differs.find([]).create(null);
        this.nativeEl = el.nativeElement;
    }
    public ngOnInit(): void {
        this.renderer.setElementClass(this.nativeEl, SortDirective.settings.sortableClassName, true);
        this.sortingsService.sortings.some(sortParameter => {
            if (sortParameter.fieldName === this.fieldName) {
                this.setSortClasses(sortParameter);
                return true;
            }
            return false;
        });
    }
    @HostListener('click', ['$event'])
    public clickHandler(evt: MouseEvent): void {
        if (this.listService.ready) {
            this.sortingsService.setSort(this.fieldName, evt.ctrlKey);
            this.listService.reloadData();
        }
    }
    public ngDoCheck(): void {
        let changes = this.sortingsDiffer.diff(this.sortingsService.sortings);
        if (changes) {
            changes.forEachRemovedItem(this.sortItemRemovedCallback);
            changes.forEachAddedItem(this.sortItemAddedCallback);
        }
    }
    private sortItemRemovedCallback = (removedItem: any): void => {
        if (removedItem.item && removedItem.item.fieldName === this.fieldName) {
            this.removeSortClasses(removedItem.item);
        }
    }
    private sortItemAddedCallback = (addedItem: any): void => {
        if (addedItem.item && addedItem.item.fieldName === this.fieldName) {
            this.setSortClasses(addedItem.item);
        }
    }
    private removeSortClasses(sortParameter: any): void {
        this.renderer.setElementClass(this.nativeEl, SortDirective.settings.sortAscClassName, false);
        this.renderer.setElementClass(this.nativeEl, SortDirective.settings.sortDescClassName, false);
    }
    private setSortClasses(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? SortDirective.settings.sortDescClassName : SortDirective.settings.sortAscClassName, false);
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? SortDirective.settings.sortAscClassName : SortDirective.settings.sortDescClassName, true);
    }
}
