import {Component, Input, OnChanges, Optional} from 'angular2/core';
import {NgListServiceMediator} from '../bootstrap/ngListServiceMediator';
import {NgListService} from '../bootstrap/ngListService';
import {NgBufferedListService} from '../bootstrap/ngBufferedListService';
import {NgPagedListService} from '../bootstrap/ngPagedListService';

@Component({
    selector: 'row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class E2E4RowNumber implements OnChanges {
    @Input() index: number;
    rowNumber: number;
    ngListServiceMediator: NgListServiceMediator;
    constructor(
        ngListServiceMediator: NgListServiceMediator) {
        this.ngListServiceMediator = ngListServiceMediator;
    }
    ngOnChanges(): void {
        if (this.ngListServiceMediator.instance instanceof NgListService || this.ngListServiceMediator.instance instanceof NgBufferedListService) {
            this.rowNumber = this.index + 1;
        } else if (this.ngListServiceMediator.instance instanceof NgPagedListService) {
            this.rowNumber = this.index + (<NgPagedListService>this.ngListServiceMediator.instance).displayFrom;
        }
    }
}
