// tslint:disable:max-classes-per-file
import { RtList } from '../../src/core/list';
import { ListStateDoneComponent, ListStateFailedComponent, ListStateInitialComponent, ListStateInProgressComponent, ListStateNoDataComponent, ListStateRequestCancelledComponent } from '../../src/list-state-components';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

@Component({
    template: `<div>
                    <rt-list-state-failed>
                        <span>State is failed</span>
                    </rt-list-state-failed>
                    <rt-list-state-initial>
                        <span>State is initial</span>
                    </rt-list-state-initial>
                    <rt-list-state-request-cancelled>
                        <span>State is request cancelled</span>
                    </rt-list-state-request-cancelled>
                    <rt-list-state-no-data>
                        <span>Stateis no data</span>
                    </rt-list-state-no-data>
                    <rt-list-state-progress>
                        <span>State is progress</span>
                    </rt-list-state-progress>
                    <rt-list-state-done>
                        <span>State is done</span>
                    </rt-list-state-done>
                </div>`
})
class HostComponent {
}

class ListStub {
    public state: ProgressState = ProgressState.Progress;
    public items: any[] = null;
}

describe('rt-list-state-... components', () => {
    let fixture: ComponentFixture<HostComponent>;
    let nativeElement: HTMLElement;
    let listService: ListStub;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                ListStateRequestCancelledComponent,
                ListStateDoneComponent,
                ListStateFailedComponent,
                ListStateInProgressComponent,
                ListStateInitialComponent,
                ListStateNoDataComponent
            ],
            providers: [{ provide: RtList, useClass: ListStub }]
        });

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        nativeElement = fixture.nativeElement;
        listService = fixture.debugElement.injector.get(RtList);
    });

    it('Coverage stub for else statement in change tracking :)', () => {
        listService.items = [];
        fixture.detectChanges();
    });
    it('Renders content of rt-list-state-progress on component init since initial state is ProgressState.Progress', () => {
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Renders content of rt-list-state-initial when state is Initial', () => {
        listService.state = ProgressState.Initial;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Renders content of rt-list-state-failed when state is Fail', () => {
        listService.state = ProgressState.Fail;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Renders content of rt-list-state-request-cancelled when state is Cancelled', () => {
        listService.state = ProgressState.Cancelled;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-cancelled  > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Renders content of rt-list-state-no-data when state is NoData', () => {
        listService.state = ProgressState.NoData;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Renders content of rt-list-state-progress when state is Progress', () => {
        listService.state = ProgressState.Progress;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Renders content of rt-list-state-done when state is Done', () => {
        listService.state = ProgressState.Done;
        fixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-cancelled  > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeDefined();
    });
});
