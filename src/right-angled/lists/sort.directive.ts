import { SkipSelf, Renderer, HostListener, Directive, ElementRef, Input, DoCheck, IterableDiffers, OnInit } from '@angular/core';
import { Defaults } from '../defaults';
import { RtListComponent } from './list.component';
import { SortDirection, SortParameter } from 'e2e4';

@Directive({
    selector: '[rt-sort]'
})
export class RtSortDirective implements DoCheck, OnInit {
    private nativeEl: HTMLElement;
    private hostList: RtListComponent;
    private differ: any;
    private renderer: Renderer;
    @Input('rt-sort') public fieldName: string;
    constructor( @SkipSelf() hostList: RtListComponent, el: ElementRef, renderer: Renderer, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.hostList = hostList;
        this.nativeEl = el.nativeElement;
        this.renderer = renderer;
    }
    public ngOnInit(): void {
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortable, true);
        this.hostList.serviceInstance.sortManager.sortings.some((sortParameter: SortParameter) => {
            if (sortParameter.fieldName === this.fieldName) {
                this.setSortClasses(sortParameter);
                return true;
            }
            return false;
        });
    }
    @HostListener('click', ['$event'])
    public clickHandler(evt: MouseEvent): void {
        if (this.hostList.serviceInstance.ready) {
            this.hostList.serviceInstance.sortManager.setSort(this.fieldName, evt.ctrlKey);
            this.hostList.serviceInstance.reloadData();
        }
    }
    public ngDoCheck(): void {
        let changes = this.differ.diff(this.hostList.serviceInstance.sortManager.sortings);
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
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortDesc, false);
    }
    private setSortClasses(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortDesc : Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortAsc : Defaults.classNames.sortDesc, true);
    }
}
