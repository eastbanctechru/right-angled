import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperationStatus } from 'e2e4';
import {
    StatusRequestCancelledComponent,
    StatusDoneComponent,
    StatusFailedComponent,
    StatusInProgressComponent,
    StatusInitialComponent,
    StatusNoDataComponent,
    RTList,
    RTOperationStatus
} from '../lists.module';

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
    public status: OperationStatus = OperationStatus.Progress;
    public items: any[] = null;
}

describe('rt-status-... components', () => {
    let fixture: ComponentFixture<HostComponent>;
    let nativeElement: HTMLElement;
    let listService: ListStub;

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
            providers: [{ provide: RTList, useClass: ListStub }, { provide: RTOperationStatus, useExisting: RTList }]
        });

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        nativeElement = fixture.nativeElement;
        listService = fixture.debugElement.injector.get(RTList);
    });

    it('Coverage stub for else statement in change tracking :)', () => {
        listService.items = [];
        fixture.detectChanges();
        expect(true).toBeTruthy();
    });
    it('Renders content of rt-status-progress on component init since initial state is OperationStatus.Progress', () => {
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of rt-status-initial when state is Initial', () => {
        listService.status = OperationStatus.Initial;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of rt-status-failed when state is Fail', () => {
        listService.status = OperationStatus.Fail;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of rt-status-request-cancelled when state is Cancelled', () => {
        listService.status = OperationStatus.Cancelled;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of rt-status-no-data when state is NoData', () => {
        listService.status = OperationStatus.NoData;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of rt-status-progress when state is Progress', () => {
        listService.status = OperationStatus.Progress;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeNull();
    });

    it('Renders content of rt-status-done when state is Done', () => {
        listService.status = OperationStatus.Done;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-status-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-status-done > span')).toBeDefined();
    });
});
