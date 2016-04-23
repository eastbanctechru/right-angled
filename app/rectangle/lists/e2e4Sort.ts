import {Directive, ElementRef, Input, DoCheck, IterableDiffers, OnInit} from 'angular2/core';
import {Defaults} from '../defaults';
import {ListComponent} from './list.component';
import {SortDirection} from 'e2e4/src/common/SortDirection';


@Directive({
    host: {
        '(click)': 'clickHandler($event)'
    },
    selector: '[e2e4-sort]'
})
export class E2E4Sort implements DoCheck, OnInit {
    private nativeElement: HTMLElement;
    hostList: ListComponent;
    private differ: any;
    @Input('e2e4-sort') fieldName: string;
    constructor(el: ElementRef, differs: IterableDiffers, hostList: ListComponent) {
        this.differ = differs.find([]).create(null);
        this.hostList = hostList;
        this.nativeElement = el.nativeElement;
    }
    ngOnInit(): void {
        this.nativeElement.classList.add(Defaults.sortAttribute.sortableClassName);
        this.hostList.serviceInstance.sortManager.sortings.forEach(sortParameter => {
            if (sortParameter.fieldName === this.fieldName) {
                this.sortAdded(sortParameter);
            }
        });
    }
    clickHandler(evt: MouseEvent): void {
        if (this.hostList.serviceInstance.ready) {
            this.hostList.serviceInstance.sortManager.setSort(this.fieldName, evt.ctrlKey);
            this.hostList.serviceInstance.onSortChangesCompleted();
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
        this.nativeElement.classList.remove(Defaults.sortAttribute.ascClassName, Defaults.sortAttribute.descClassName);
    }
    sortAdded(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.nativeElement.classList.remove(direction === SortDirection.Asc ? Defaults.sortAttribute.descClassName : Defaults.sortAttribute.ascClassName);
        this.nativeElement.classList.add(direction === SortDirection.Asc ? Defaults.sortAttribute.ascClassName : Defaults.sortAttribute.descClassName);
    }
}
