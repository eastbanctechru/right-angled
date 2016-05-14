import {Directive, ElementRef, Input, DoCheck, IterableDiffers, OnInit} from 'angular2/core';
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
    private nativeElement: HTMLElement;
    hostList: RtList;
    private differ: any;
    @Input('rt-sort') fieldName: string;
    constructor(el: ElementRef, differs: IterableDiffers, hostList: RtList) {
        this.differ = differs.find([]).create(null);
        this.hostList = hostList;
        this.nativeElement = el.nativeElement;
    }
    ngOnInit(): void {
        this.nativeElement.classList.add(Defaults.classNames.sortable);
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
        this.nativeElement.classList.remove(Defaults.classNames.sortAsc, Defaults.classNames.sortDesc);
    }
    sortAdded(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.nativeElement.classList.remove(direction === SortDirection.Asc ? Defaults.classNames.sortDesc : Defaults.classNames.sortAsc);
        this.nativeElement.classList.add(direction === SortDirection.Asc ? Defaults.classNames.sortAsc : Defaults.classNames.sortDesc);
    }
}
