import {Component, Input, OnChanges, OnDestroy, OnInit, Optional} from '@angular/core';
import {NgBufferedListService} from '../bootstrap/ngBufferedListService';
import {NgPagedListService} from '../bootstrap/ngPagedListService';
import {NgSimpleListService} from '../bootstrap/ngSimpleListService';

@Component({
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class RtListComponent implements OnChanges, OnDestroy, OnInit {
    @Input() items: Array<any>;
    @Input('load-on-init') loadOnInit: boolean = true;
    constructor( @Optional() bufferedListService: NgBufferedListService, @Optional() pagedListService: NgPagedListService, @Optional() simpleListService: NgSimpleListService) {
        this.serviceInstance = simpleListService || bufferedListService || pagedListService;
        this.isBufferedList = !!bufferedListService;
        this.isPagedList = !!pagedListService;
        this.isSimpleList = !!simpleListService;
    }
    serviceInstance: NgSimpleListService | NgBufferedListService | NgPagedListService;
    isBufferedList: boolean;
    isPagedList: boolean;
    isSimpleList: boolean;
    ngOnInit(): void {
        if (this.loadOnInit && this.serviceInstance.inited) {
            this.serviceInstance.loadData();
        }
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
