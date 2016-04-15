import {Optional} from 'angular2/core';
import {NgBufferedListService} from './ngBufferedListService';
import {NgPagedListService} from './ngPagedListService';
import {NgListService} from './ngListService';

export class NgListServiceMediator {
    private bufferedListService: NgBufferedListService;
    private pagedListService: NgPagedListService;
    private simpleListService: NgListService;
    constructor(@Optional()bufferedList: NgBufferedListService, @Optional()pagedList: NgPagedListService, @Optional()simpleList: NgListService) {
        this.bufferedListService = bufferedList;
        this.pagedListService = pagedList;
        this.simpleListService = simpleList;
    }
    get instance(): NgListService | NgBufferedListService | NgPagedListService {
        return this.simpleListService || this.bufferedListService || this.pagedListService;
    }
}
