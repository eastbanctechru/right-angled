import {Component, Input, OnInit} from 'angular2/core';
import {NgListService} from './ngListService';

@Component({
    providers: [NgListService],
    selector: 'e2e4-list',
    template: `<ng-content></ng-content>`
})
export class E2E4List implements OnInit {
    @Input() dataReadDelegate: () => Promise<any>;
    @Input('listService') inputListService: NgListService;
    @Input() items: () => Array<any>;
    injectedListService: NgListService;
    constructor(ngListService: NgListService) {
        this.injectedListService = ngListService;
    }
    ngOnInit(): void {
        this.injectedListService.normalizedService = this.inputListService || this.injectedListService;
        this.injectedListService.normalizedService.dataReadDelegate = this.dataReadDelegate;
    }
}
