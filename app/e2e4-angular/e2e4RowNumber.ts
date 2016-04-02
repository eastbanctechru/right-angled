import {Component, Input, OnChanges, Optional} from 'angular2/core';
import {NgListService} from './ngListService';
import {NgBufferedListService} from './ngBufferedListService';
import {NgPagedListService} from './ngPagedListService';

@Component({
    selector: 'row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class E2E4RowNumber implements OnChanges {
    @Input() index: number;
    rowNumber: number;
    ngListService: NgListService;
    ngBufferedListService: NgBufferedListService;
    ngPagedListService: NgPagedListService;
    constructor( @Optional() ngListService: NgListService,
        @Optional() ngBufferedListService: NgBufferedListService,
        @Optional() ngPagedListService: NgPagedListService) {
        this.ngListService = ngListService;
        this.ngBufferedListService = ngBufferedListService;
        this.ngPagedListService = ngPagedListService;
    }
    ngOnChanges(): void {
        if (!this.ngListService && !this.ngBufferedListService && !this.ngPagedListService) {
            throw new Error('Context for row-number element must be instance of ListComponent or inherit from ListComponent.');
        }
        if (this.ngListService || this.ngBufferedListService) {
            this.rowNumber = this.index + 1;
        } else if (this.ngPagedListService) {
            this.rowNumber = this.index + (this.ngPagedListService).displayFrom;
        }
    }
}
