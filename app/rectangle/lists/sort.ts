import {Renderer, Directive, ElementRef, Input, DoCheck, IterableDiffers, OnInit} from '@angular/core';
import {Defaults} from '../defaults';
import {RtList} from './list';
import {SortDirection} from 'e2e4/src/common/sortDirection';


@Directive({
    host: {
        '(click)': 'clickHandler($event)'
    },
    selector: '[rt-sort]'
})
export class RtSort implements DoCheck, OnInit {
    private nativeEl: HTMLElement;
    hostList: RtList;
    private differ: any;
    private renderer: Renderer;
    @Input('rt-sort') fieldName: string;
    constructor(el: ElementRef, renderer: Renderer, differs: IterableDiffers, hostList: RtList) {
        this.differ = differs.find([]).create(null);
        this.hostList = hostList;
        this.nativeEl = el.nativeElement;
        this.renderer = renderer;
    }
    ngOnInit(): void {
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortable, true);
        this.hostList.serviceInstance.sortManager.sortings.some(sortParameter => {
            if (sortParameter.fieldName === this.fieldName) {
                this.sortAdded(sortParameter);
                return true;
            }
            return false;
        });
    }
    clickHandler(evt: MouseEvent): void {
        if (this.hostList.serviceInstance.ready) {
            this.hostList.serviceInstance.sortManager.setSort(this.fieldName, evt.ctrlKey);
            this.hostList.serviceInstance.reloadData();
        }
    }
    ngDoCheck(): void {
        let changes = this.differ.diff(this.hostList.serviceInstance.sortManager.sortings);
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
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortDesc, false);
    }
    sortAdded(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortDesc : Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortAsc : Defaults.classNames.sortDesc, true);
    }
}
