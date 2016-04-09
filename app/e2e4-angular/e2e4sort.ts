import {Directive, ElementRef, Input, Optional, DoCheck, IterableDiffers, OnInit} from 'angular2/core';
import {Defaults} from './defaults';
import {NgListService} from './ngListService';
import {NgPagedListService} from './ngPagedListService';
import {NgBufferedListService} from './ngBufferedListService';
import {SortDirection} from 'e2e4/src/common/SortDirection';


@Directive({
    host: {
        '(click)': 'clickHandler($event)'
    },
    selector: '[e2e4-sort]'
})
export class E2E4Sort implements DoCheck, OnInit {
    private nativeElement: HTMLElement;
    listService: NgListService | NgPagedListService | NgBufferedListService;
    private differ: any;
    @Input('e2e4-sort') fieldName: string;
    constructor(el: ElementRef,
        differs: IterableDiffers,
        @Optional() ngListService: NgListService,
        @Optional() ngPagedListService: NgPagedListService,
        @Optional() ngBufferedListService: NgBufferedListService) {
        this.differ = differs.find([]).create(null);
        this.listService = ngListService || ngPagedListService || ngBufferedListService;
        this.nativeElement = el.nativeElement;
        this.nativeElement.classList.add(Defaults.sortAttribute.sortableClassName);
    }
    ngOnInit(): void {
        this.listService.normalizedService.sortManager.sortings.forEach(sortParameter => {
            if (sortParameter.fieldName === this.fieldName) {
                this.sortAdded(sortParameter);
            }
        });
    }
    clickHandler(evt: MouseEvent): void {
        if (this.listService.normalizedService.ready) {
            this.listService.normalizedService.sortManager.setSort(this.fieldName, evt.ctrlKey);
            this.listService.normalizedService.onSortChangesCompleted();
        }
    }
    ngDoCheck(): void {
        let changes = this.differ.diff(this.listService.normalizedService.sortManager.sortings);
        if (changes) {
            changes.forEachRemovedItem((removedItem => {
                if (removedItem.item && removedItem.item.fieldName === this.fieldName) {
                    this.sortRemoved(removedItem.item);
                }
            }).bind(this));
            changes.forEachAddedItem((addedItem => {
                if (addedItem.item && addedItem.item.fieldName === this.fieldName) {
                    this.sortAdded(addedItem.item);
                }
            }).bind(this));
        }
    }
    sortRemoved(sortParameter: any): void {
        this.nativeElement.classList.remove(Defaults.sortAttribute.ascClassName, Defaults.sortAttribute.descClassName);
    }
    sortAdded(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.nativeElement.classList.remove(direction === SortDirection.Asc ? Defaults.sortAttribute.descClassName : Defaults.sortAttribute.ascClassName);
        this.nativeElement.classList.add(direction === SortDirection.Asc ? Defaults.sortAttribute.ascClassName : Defaults.sortAttribute.descClassName);
    }
}
