import {
    Directive,
    DoCheck,
    ElementRef,
    HostListener,
    Input,
    IterableDiffer,
    IterableDiffers,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChange,
    SkipSelf
} from '@angular/core';
import { RTList } from './providers/list';
import { RTSortingsService } from './providers/sortings.service';
import { SortParameter, SortDirection } from '../core/sort-parameter';

@Directive({
    selector: '[rtSort]'
})
export class SortDirective implements DoCheck, OnInit, OnChanges {
    public static settings: {
        sortAscClassName: string;
        sortDescClassName: string;
        sortableClassName: string;
    } = {
        sortAscClassName: 'rt-sort-asc',
        sortDescClassName: 'rt-sort-desc',
        sortableClassName: 'rt-sortable'
    };
    @Input('rtSort') public fieldName: string;
    @Input() public disableSort: false;
    private nativeEl: HTMLElement;
    private sortingsDiffer: IterableDiffer<SortParameter>;

    constructor(
        @SkipSelf() private listService: RTList,
        @SkipSelf() private sortingsService: RTSortingsService,
        private renderer: Renderer2,
        el: ElementRef,
        differs: IterableDiffers
    ) {
        this.sortingsDiffer = differs.find([]).create(null);
        this.nativeEl = el.nativeElement;
    }
    public ngOnInit(): void {
        if (SortDirective.settings.sortableClassName) {
            this.renderer.addClass(this.nativeEl, SortDirective.settings.sortableClassName);
        }
        this.sortingsService.sortings.some(sortParameter => {
            if (sortParameter.fieldName === this.fieldName) {
                this.setSortClasses(sortParameter);
                return true;
            }
            return false;
        });
    }
    @HostListener('click', ['$event.ctrlKey'])
    public clickHandler(ctrlKeyPressed: boolean): void {
        if (this.listService.ready && !this.disableSort) {
            this.sortingsService.setSort(this.fieldName, ctrlKeyPressed);
            this.listService.reloadData();
        }
    }
    public ngDoCheck(): void {
        const changes = this.sortingsDiffer.diff(this.sortingsService.sortings);
        if (changes) {
            changes.forEachRemovedItem(this.sortItemRemovedCallback);
            changes.forEachAddedItem(this.sortItemAddedCallback);
        }
    }
    public ngOnChanges(changes: { disableSort?: SimpleChange }): void {
        if (changes.disableSort && changes.disableSort.currentValue) {
            this.sortingsService.removeSort(this.fieldName);
        }
    }
    private sortItemRemovedCallback = (removedItem: any): void => {
        if (removedItem.item && removedItem.item.fieldName === this.fieldName) {
            this.removeSortClasses();
        }
    };
    private sortItemAddedCallback = (addedItem: any): void => {
        if (addedItem.item && addedItem.item.fieldName === this.fieldName) {
            this.setSortClasses(addedItem.item);
        }
    };
    private removeSortClasses(): void {
        if (SortDirective.settings.sortAscClassName) {
            this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortAscClassName);
        }
        if (SortDirective.settings.sortDescClassName) {
            this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortDescClassName);
        }
    }
    private setSortClasses(sortParameter: any): void {
        const direction = sortParameter.direction;
        if (SortDirective.settings.sortAscClassName) {
            if (direction === SortDirection.Asc) {
                this.renderer.addClass(this.nativeEl, SortDirective.settings.sortAscClassName);
            } else {
                this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortAscClassName);
            }
        }
        if (SortDirective.settings.sortDescClassName) {
            if (direction === SortDirection.Desc) {
                this.renderer.addClass(this.nativeEl, SortDirective.settings.sortDescClassName);
            } else {
                this.renderer.removeClass(this.nativeEl, SortDirective.settings.sortDescClassName);
            }
        }
    }
}
