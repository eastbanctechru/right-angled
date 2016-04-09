import {Component, Input, Optional} from 'angular2/core';
import {NgListService} from './ngListService';
import {NgPagedListService} from './ngPagedListService';
import {NgBufferedListService} from './ngBufferedListService';

@Component({
    selector: 'e2e4-load-button',
    template: `<input type="button" class="btn btn-success" value="Load data" (click)="loadData()" />`
})
export class E2E4LoadButton {
    listService: NgListService | NgPagedListService | NgBufferedListService;
    constructor(
        @Optional() ngListService: NgListService,
        @Optional() ngPagedListService: NgPagedListService,
        @Optional() ngBufferedListService: NgBufferedListService) {
        this.listService = ngListService || ngPagedListService || ngBufferedListService;
    }
    loadData(): void {
        this.listService.normalizedService.reloadData();
    }
}
