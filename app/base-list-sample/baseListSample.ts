import {Component, OnInit} from 'angular2/core';
import {AirportsService} from './airportsService';
import {E2E4List} from '../e2e4-angular/e2e4List';
import {E2E4LoadButton} from '../e2e4-angular/e2e4LoadButton';
import {E2E4RowNumber} from '../e2e4-angular/e2e4RowNumber';
import {E2E4Sort} from '../e2e4-angular/e2e4Sort';
import {NgPagedListService} from '../e2e4-angular/ngPagedListService';
import {E2E4SelectionArea} from '../e2e4-angular/e2e4SelectionArea';

@Component({
    directives: [E2E4List, E2E4LoadButton, E2E4RowNumber, E2E4Sort, E2E4SelectionArea],
    providers: [AirportsService, NgPagedListService],
    templateUrl: 'app/base-list-sample/baseListSample.html'
})
export class BaseListSample implements OnInit {
    message: string = 'Hello';
    airportsService: AirportsService;
    items: Array<any> = new Array<any>();
    constructor(listComponentService: AirportsService, ngPagedListService: NgPagedListService) {
        this.airportsService = listComponentService;
    }
    ngOnInit(): void {
        // this.airportsService.getAirportsPaged({ sort: [] }).then(result => { this.items = result.items; });
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsPaged(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
