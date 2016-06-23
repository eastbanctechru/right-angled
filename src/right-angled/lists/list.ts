import {SkipSelf, Component, Input, OnChanges, OnDestroy, OnInit, Optional} from '@angular/core';
import {NgBufferedListService} from '../bootstrap/ngBufferedListService';
import {NgPagedListService} from '../bootstrap/ngPagedListService';
import {NgListService} from '../bootstrap/ngListService';

@Component({
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class RtListComponent implements OnChanges, OnDestroy, OnInit {
    @Input() items: Array<any>;
    @Input('load-on-init') loadOnInit: boolean = true;
    constructor( @SkipSelf()@Optional() bufferedListService: NgBufferedListService, @SkipSelf()@Optional() pagedListService: NgPagedListService, @SkipSelf()@Optional() listService: NgListService) {
        this.serviceInstance = listService || bufferedListService || pagedListService;
        this.isBufferedList = !!bufferedListService;
        this.isPagedList = !!pagedListService;
        this.isRegularList = !!listService;
    }
    serviceInstance: NgListService | NgBufferedListService | NgPagedListService;
    isBufferedList: boolean;
    isPagedList: boolean;
    isRegularList: boolean;
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
