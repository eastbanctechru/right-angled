import {Directive} from 'angular2/core';
import {NgListServiceMediator} from '../bootstrap/ngListServiceMediator';

@Directive({
    host: {
        '(click)': 'loadData()'
    },
    selector: '[e2e4-load-button]'
})
export class E2E4LoadButton {
    ngListServiceMediator: NgListServiceMediator;
    constructor(
        ngListServiceMediator: NgListServiceMediator) {
        this.ngListServiceMediator = ngListServiceMediator;
    }
    loadData(): void {
        this.ngListServiceMediator.instance.reloadData();
    }
}
