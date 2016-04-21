import {Directive} from 'angular2/core';
import {NgListServiceMediator} from './ngListServiceMediator';

@Directive({
    host: {
        '(click)': 'reset()'
    },
    selector: '[e2e4-reset-button]'
})
export class E2E4ResetButton {
    ngListServiceMediator: NgListServiceMediator;
    constructor(
        ngListServiceMediator: NgListServiceMediator) {
        this.ngListServiceMediator = ngListServiceMediator;
    }
    reset(): void {
        this.ngListServiceMediator.instance.filterManager.resetFilters();
    }
}
