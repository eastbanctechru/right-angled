import {Component, Input} from 'angular2/core';
import {NgListService} from './ngListService';

@Component({
    selector: 'e2e4-load-button',
    template: `<input type="button" class="btn btn-success" value="Load data" (click)="loadData()" />`
})
export class E2E4LoadButton {
    ngListService: NgListService;
    constructor(ngListService: NgListService) {
        this.ngListService = ngListService;
    }
    loadData(): void {
        debugger;
        this.ngListService.normalizedService.reloadData();
    }
}
