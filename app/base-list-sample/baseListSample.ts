import {Component, OnInit} from 'angular2/core';
import {ListComponentService} from './baseListService';
import {E2E4List} from '../e2e4-angular/e2e4List';
import {E2E4LoadButton} from '../e2e4-angular/e2e4LoadButton';
import {E2E4RowNumber} from '../e2e4-angular/e2e4RowNumber';

@Component({
    directives: [E2E4List, E2E4LoadButton, E2E4RowNumber],
    providers: [ListComponentService],
    templateUrl: 'app/base-list-sample/baseListSample.html'
})
export class BaseListSample implements OnInit {
    message: string = 'Hello';
    listComponentService: ListComponentService;
    items: Array<any> = new Array<any>();
    constructor(listComponentService: ListComponentService) {
        this.listComponentService = listComponentService;
    }
    ngOnInit(): void {
        this.listComponentService.getData({ sort: [] }).then(result => { this.items = result.items; });
    }
    loadData = (): Promise<any> => {
        return this.listComponentService.getData({ sort: [] }).then(result => {
            this.items = result.items;
            return result;
        }); };
}
