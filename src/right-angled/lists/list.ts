import { SkipSelf, Component, Input, OnChanges, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgBufferedListService } from '../bootstrap/ngBufferedListService';
import { NgPagedListService } from '../bootstrap/ngPagedListService';
import { NgListService } from '../bootstrap/ngListService';

@Component({
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class RtListComponent implements OnChanges, OnDestroy, OnInit {
    @Input() public items: Array<any>;
    @Input('load-on-init') public loadOnInit: boolean = true;
    public serviceInstance: NgListService | NgBufferedListService | NgPagedListService;
    public isBufferedList: boolean;
    public isPagedList: boolean;
    public isRegularList: boolean;
    constructor( @SkipSelf() @Optional() bufferedListService: NgBufferedListService, @SkipSelf() @Optional() pagedListService: NgPagedListService, @SkipSelf() @Optional() listService: NgListService) {
        this.serviceInstance = listService || bufferedListService || pagedListService;
        this.isBufferedList = !!bufferedListService;
        this.isPagedList = !!pagedListService;
        this.isRegularList = !!listService;
    }
    public ngOnInit(): void {
        if (this.loadOnInit && this.serviceInstance.inited) {
            this.serviceInstance.loadData();
        }
    }
    public ngOnDestroy(): void {
        this.serviceInstance.dispose();
    }
    public ngOnChanges(changes: any): void {
        if (changes.items) {
            this.serviceInstance.items = changes.items.currentValue;
        }
    }
}
