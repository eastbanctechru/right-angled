import {Directive, ElementRef, Input, Optional, OnChanges} from 'angular2/core';
import {Defaults} from 'e2e4/src/common/defaults';
import {NgListService} from './ngListService';
import {NgPagedListService} from './ngPagedListService';
import {NgBufferedListService} from './ngBufferedListService';
import {SortDirection} from 'e2e4/src/common/SortDirection';


@Directive({
    host: {
        '(click)': 'clickHandlerBinded($event)'
    },
    selector: '[e2e4-sort]'
})
export class E2E4Sort implements OnChanges {
    private nativeElement: HTMLElement;
    listService: NgListService | NgPagedListService | NgBufferedListService;
    private clickHandlerBinded: (event: MouseEvent) => any;
    private checkElementClassesBinded: () => void;
    @Input('e2e4-sort') columnName: string;
    constructor(el: ElementRef,
        @Optional() ngListService: NgListService,
        @Optional() ngPagedListService: NgPagedListService,
        @Optional() ngBufferedListService: NgBufferedListService) {
        this.listService = ngListService || ngPagedListService || ngBufferedListService;
        this.clickHandlerBinded = this.clickHandler.bind(this);
        this.checkElementClassesBinded = this.checkElementClasses.bind(this);
        this.nativeElement = el.nativeElement;
        this.nativeElement.classList.add(Defaults.sortAttribute.sortableClassName);
    }
    clickHandler(evt: MouseEvent): void {
        if (this.listService.ready) {
            this.listService.sortManager.setSort(this.columnName, evt.ctrlKey);
            this.listService.onSortChangesCompleted();
        }
    }
    ngOnChanges(): void {
        this.checkElementClassesBinded();
    }
    checkElementClasses(): void {
        const existedSortIndex = this.listService.sortManager.sortings ?
            this.listService.sortManager.sortings.findIndex(sp => sp.fieldName === this.columnName) : -1;
        if (existedSortIndex !== -1) {
            const direction = this.listService.sortManager.sortings[existedSortIndex].direction;
            this.nativeElement.classList.remove(direction === SortDirection.Asc ? Defaults.sortAttribute.descClassName : Defaults.sortAttribute.ascClassName);
            this.nativeElement.classList.add(direction === SortDirection.Asc ? Defaults.sortAttribute.ascClassName : Defaults.sortAttribute.descClassName);
        } else {
            this.nativeElement.classList.remove(Defaults.sortAttribute.ascClassName, Defaults.sortAttribute.descClassName);
        }
    }
}
