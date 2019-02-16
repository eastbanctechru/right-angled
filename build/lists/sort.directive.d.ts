import { DoCheck, ElementRef, IterableDiffers, OnChanges, OnInit, Renderer2, SimpleChange } from '@angular/core';
import { SortingsService } from 'e2e4';
import { RTList } from './providers/list';
export declare class SortDirective implements DoCheck, OnInit, OnChanges {
    private listService;
    private sortingsService;
    private renderer;
    static settings: {
        sortAscClassName: string;
        sortDescClassName: string;
        sortableClassName: string;
    };
    fieldName: string;
    disableSort: false;
    private nativeEl;
    private sortingsDiffer;
    constructor(listService: RTList, sortingsService: SortingsService, renderer: Renderer2, el: ElementRef, differs: IterableDiffers);
    ngOnInit(): void;
    clickHandler(ctrlKeyPressed: boolean): void;
    ngDoCheck(): void;
    ngOnChanges(changes: {
        disableSort?: SimpleChange;
    }): void;
    private sortItemRemovedCallback;
    private sortItemAddedCallback;
    private removeSortClasses;
    private setSortClasses;
}
