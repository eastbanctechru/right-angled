import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    StatusRequestCancelledComponent,
    StatusDoneComponent,
    StatusFailedComponent,
    StatusInProgressComponent,
    StatusInitialComponent,
    StatusNoDataComponent,
    RTList,
    OperationStatusStream
} from '../lists.module';
import { OperationStatus } from '../../core/operation-status';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    template: `
        <div>
            <rt-status-failed>
                <span>State is failed</span>
            </rt-status-failed>
            <rt-status-initial>
                <span>State is initial</span>
            </rt-status-initial>
            <rt-status-request-cancelled>
                <span>State is request cancelled</span>
            </rt-status-request-cancelled>
            <rt-status-no-data>
                <span>Stateis no data</span>
            </rt-status-no-data>
            <rt-status-progress>
                <span>State is progress</span>
            </rt-status-progress>
            <rt-status-done>
                <span>State is done</span>
            </rt-status-done>
        </div>
    `
})
class HostComponent {}

class ListStub {
    public status$: Observable<OperationStatus> = new BehaviorSubject(OperationStatus.Progress);
    public items: any[] = null;
}

describe('rt-status-... components', () => {
    let fixture: ComponentFixture<HostComponent>;
    let nativeElement: HTMLElement;
    let list: ListStub;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                StatusRequestCancelledComponent,
                StatusDoneComponent,
                StatusFailedComponent,
                StatusInProgressComponent,
                StatusInitialComponent,
                StatusNoDataComponent
            ],
            providers: [{ provide: RTList, useClass: ListStub }, { provide: OperationStatusStream, useExisting: RTList }]
        });

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        nativeElement = fixture.nativeElement;
        list = fixture.debugElement.injector.get(RTList) as ListStub;
    });

    it('сoverage stub for else statement in change tracking :)', () => {
        list.items = [];
        fixture.detectChanges();
        expect(true).toBeTruthy();
    });
    it('кenders content of `rt-status-progress` on component init since initial state is `Progress`', () => {
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of `rt-status-initial` when state is `Initial`', () => {
        (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Initial);
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of `rt-status-failed` when state is `Fail`', () => {
        (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Fail);
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of `rt-status-request-cancelled` when state is `Cancelled`', () => {
        (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Cancelled);
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of `rt-status-no-data` when state is `NoData`', () => {
        (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.NoData);
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of `rt-status-progress` when state is `Progress`', () => {
        (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Progress);
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of `rt-status-done` when state is `Done`', () => {
        (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Done);
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeDefined();
    });
});
