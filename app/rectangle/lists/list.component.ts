import {Component, Input, OnChanges, OnDestroy} from 'angular2/core';
import {Optional} from 'angular2/core';
import {NgBufferedListService} from '../bootstrap/ngBufferedListService';
import {NgPagedListService} from '../bootstrap/ngPagedListService';
import {NgSimpleListService} from '../bootstrap/ngSimpleListService';

@Component({
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class ListComponent implements OnChanges, OnDestroy {
    @Input() items: Array<any>;
    private bufferedListService: NgBufferedListService;
    private pagedListService: NgPagedListService;
    private simpleListService: NgSimpleListService;
    constructor( @Optional() bufferedList: NgBufferedListService, @Optional() pagedList: NgPagedListService, @Optional() simpleList: NgSimpleListService) {
        this.bufferedListService = bufferedList;
        this.pagedListService = pagedList;
        this.simpleListService = simpleList;
    }
    get serviceInstance(): NgSimpleListService | NgBufferedListService | NgPagedListService {
        return this.simpleListService || this.bufferedListService || this.pagedListService;
    }
    get isBufferedList(): boolean {
        return !!this.bufferedListService;
    }
    get isPagedList(): boolean {
        return !!this.pagedListService;
    }
    get isSimpleList(): boolean {
        return !!this.simpleListService;
    }
    ngOnDestroy(): void {
        this.serviceInstance.dispose();
    }
    ngOnChanges(changes: any): void {
        if (changes.items) {
            this.serviceInstance.items = changes.items.currentValue;
        }
    }
}
