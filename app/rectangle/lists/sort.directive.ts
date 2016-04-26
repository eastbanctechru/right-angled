import {Directive, ElementRef, Input, DoCheck, IterableDiffers, OnInit} from 'angular2/core';
import {Defaults} from '../defaults';
import {ListComponent} from './list.component';
import {SortDirection} from 'e2e4/src/common/SortDirection';


@Directive({
    host: {
        '(click)': 'clickHandler($event)'
    },
    selector: '[rt-sort]'
})
export class SortDirective implements DoCheck, OnInit {
    private nativeElement: HTMLElement;
    hostList: ListComponent;
    private differ: any;
    @Input('rt-sort') fieldName: string;
    @Input('asc-class-name') ascCls: string = Defaults.classNames.loadButtonLoad;
    @Input('desc-class-name') descCls: string = Defaults.classNames.loadButtonLoad;
    @Input('sortable-class-name') sortableCls: string = Defaults.classNames.loadButtonLoad;
    
    constructor(el: ElementRef, differs: IterableDiffers, hostList: ListComponent) {
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
        this.nativeElement.classList.remove(Defaults.classNames.sortAsc, Defaults.classNames.sortDesc);
    }
    sortAdded(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.nativeElement.classList.remove(direction === SortDirection.Asc ? Defaults.classNames.sortDesc : Defaults.classNames.sortAsc);
        this.nativeElement.classList.add(direction === SortDirection.Asc ? Defaults.classNames.sortAsc : Defaults.classNames.sortDesc);
    }
}
