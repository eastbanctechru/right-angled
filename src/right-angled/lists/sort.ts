import {SkipSelf, Renderer, HostListener, Directive, ElementRef, Input, DoCheck, IterableDiffers, OnInit} from '@angular/core';
import {Defaults} from '../defaults';
import {RtListComponent} from './list';
import {SortDirection} from 'e2e4';


@Directive({
    selector: '[rt-sort]'
})
export class RtSortDirective implements DoCheck, OnInit {
    private nativeEl: HTMLElement;
    hostList: RtListComponent;
    private differ: any;
    private renderer: Renderer;
    @Input('rt-sort') fieldName: string;
    constructor(@SkipSelf()hostList: RtListComponent, el: ElementRef, renderer: Renderer, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.hostList = hostList;
        this.nativeEl = el.nativeElement;
        this.renderer = renderer;
    }
    ngOnInit(): void {
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortable, true);
        this.hostList.serviceInstance.sortManager.sortings.some(sortParameter => {
            if (sortParameter.fieldName === this.fieldName) {
                this.setSortClasses(sortParameter);
                return true;
            }
            return false;
        });
    }
    @HostListener('click', ['$event'])
    clickHandler(evt: MouseEvent): void {
        if (this.hostList.serviceInstance.ready) {
            this.hostList.serviceInstance.sortManager.setSort(this.fieldName, evt.ctrlKey);
            this.hostList.serviceInstance.reloadData();
        }
    }
    ngDoCheck(): void {
        let changes = this.differ.diff(this.hostList.serviceInstance.sortManager.sortings);
        if (changes) {
            changes.forEachRemovedItem(this.sortItemRemovedCallback);
            changes.forEachAddedItem(this.sortItemAddedCallback);
        }
    }
    sortItemRemovedCallback = (removedItem: any): void => {
        if (removedItem.item && removedItem.item.fieldName === this.fieldName) {
            this.removeSortClasses(removedItem.item);
        }
    }
    sortItemAddedCallback = (addedItem: any): void => {
        if (addedItem.item && addedItem.item.fieldName === this.fieldName) {
            this.setSortClasses(addedItem.item);
        }
    }
    removeSortClasses(sortParameter: any): void {
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortDesc, false);
    }
    setSortClasses(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortDesc : Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortAsc : Defaults.classNames.sortDesc, true);
    }
}
