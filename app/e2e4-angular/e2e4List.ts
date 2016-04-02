import {Component, Input, OnInit} from 'angular2/core';
import {NgListService} from './ngListService';

@Component({
    providers: [NgListService],
    selector: 'e2e4-list',
    template: `<ng-content></ng-content>`
})
export class E2E4List implements OnInit {
    @Input() dataReadDelegate: () => Promise<any>;
    @Input() items: () => Array<any>;
    ngListService: NgListService;
    constructor(ngListService: NgListService) {
        debugger;
        this.ngListService = ngListService;
    }
    ngOnInit(): void {
        debugger;
        this.ngListService.dataReadDelegate = this.dataReadDelegate;
    }
}
