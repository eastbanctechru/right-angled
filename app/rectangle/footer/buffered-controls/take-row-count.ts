import {Component, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy} from 'angular2/core';
import {RtList} from '../../lists/list';
import {NgBufferedListService} from '../../bootstrap/ngBufferedListService';
import {MISC_DIRECTIVES} from '../../misc-directives';

@Component({
    directives: [MISC_DIRECTIVES],
    selector: 'rt-take-row-count',
    template: '<input rt-select-on-focus type="text" maxlength="3" (keyup.enter)="onEnter($event)" [(ngModel)]="rowCount"/>'
})
export class RtTakeRowCount implements DoCheck, OnDestroy {
    bufferedListService: NgBufferedListService;
    private innerRowCount: number;
    private serviceDiffer: KeyValueDiffer;
    private checkRowCountChangedBinded: (item: any) => void;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        if (!listHost.isBufferedList) {
            throw new Error('[rt-take-row-count] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <NgBufferedListService>listHost.serviceInstance;
        this.innerRowCount = this.bufferedListService.takeRowCount;
        this.serviceDiffer = differs.find([]).create(null);
        this.checkRowCountChangedBinded = this.checkRowCountChange.bind(this);
    }

    get rowCount(): any {
        return this.innerRowCount;
    }
    set rowCount(value: any) {
        this.innerRowCount = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.bufferedListService.takeRowCount = value;
        setTimeout(() => this.innerRowCount = this.bufferedListService.takeRowCount);
    }
    checkRowCountChange(item: any): void {
        if (item.key === 'takeRowCountInternal' && item.currentValue!==this.innerRowCount) {
            this.innerRowCount = item.currentValue;
        }
    }
    ngOnDestroy(): void {
        delete this.checkRowCountChangedBinded;
    }
    ngDoCheck(): void {
        let serviceDiff = this.serviceDiffer.diff(this.bufferedListService);
        if (serviceDiff) {
            serviceDiff.forEachChangedItem(this.checkRowCountChangedBinded);
        }
    }
    onEnter(evt: KeyboardEvent): void {
        this.innerRowCount = this.bufferedListService.takeRowCount;
        this.bufferedListService.loadData();
    }
}
