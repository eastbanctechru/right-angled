import {  Directive, DoCheck, ElementRef, HostListener, Input, IterableDiffer, IterableDiffers, OnInit, Renderer, SkipSelf } from '@angular/core';
import { SortDirection, SortingsService } from 'e2e4';

import { RtListService } from '../list-service';

@Directive({
    selector: '[rtSort]'
})
export class SortDirective implements DoCheck, OnInit {
    public static classNames: any =
    {
        sortAsc: 'rt-sort-asc',
        sortDesc: 'rt-sort-desc',
        sortable: 'rt-sortable'
    };
    private nativeEl: HTMLElement;
    private sortingsDiffer: IterableDiffer;
    @Input('rtSort') public fieldName: string;
    constructor( @SkipSelf() private listService: RtListService, @SkipSelf() private sortingsService: SortingsService, private renderer: Renderer, el: ElementRef, differs: IterableDiffers) {
        this.sortingsDiffer = differs.find([]).create(null);
        this.nativeEl = el.nativeElement;
    }
    public ngOnInit(): void {
        this.renderer.setElementClass(this.nativeEl, SortDirective.classNames.sortable, true);
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
        this.renderer.setElementClass(this.nativeEl, SortDirective.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, SortDirective.classNames.sortDesc, false);
    }
    private setSortClasses(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? SortDirective.classNames.sortDesc : SortDirective.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? SortDirective.classNames.sortAsc : SortDirective.classNames.sortDesc, true);
    }
}
