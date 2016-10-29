import { RtList } from '../../src/core/list';
import { ListStateDoneComponent, ListStateFailedComponent, ListStateInProgressComponent, ListStateInitialComponent, ListStateNoDataComponent, ListStateRequestCanceledComponent } from '../../src/list-state-components';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

@Component({
    template: `<div id="testListStatesContainer">
                    <rt-list-state-failed>
                        <span>State is failed</span>
                    </rt-list-state-failed>
                    <rt-list-state-initial>
                        <span>State is initial</span>
                    </rt-list-state-initial>
                    <rt-list-state-request-canceled>
                        <span>State is request canceled</span>
                    </rt-list-state-request-canceled>
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
class ListStatesContentVisibilityTestComponent {
}

class MockList {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state components', () => {
    let testComponent: ListStatesContentVisibilityTestComponent;
    let testComponentFixture: any;
    let listService: MockList;
    let nativeElement: any;

    beforeAll(() => {
        listService = new MockList();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListStatesContentVisibilityTestComponent,
                ListStateRequestCanceledComponent,
                ListStateDoneComponent,
                ListStateFailedComponent,
                ListStateInProgressComponent,
                ListStateInitialComponent,
                ListStateNoDataComponent
            ],
            providers: [{ provide: RtList, useValue: listService }]
        });

        testComponentFixture = TestBed.createComponent(ListStatesContentVisibilityTestComponent);
        testComponent = testComponentFixture.componentInstance;
        nativeElement = testComponentFixture.nativeElement;
    });

    it('Test component is defined', () => {
        expect(testComponent).toBeDefined();
    });

    it('Only list-state-initial content visible', () => {
        listService.state = ProgressState.Initial;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-canceled  >span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Only list-state-failed content visible', () => {
        listService.state = ProgressState.Fail;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-request-canceled  >span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Only list-state-canceled content visible', () => {
        listService.state = ProgressState.Cancelled;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-canceled  >span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Only list-state-no-data content visible', () => {
        listService.state = ProgressState.NoData;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-canceled  >span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Only list-state-progress content visible', () => {
        listService.state = ProgressState.Progress;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-canceled  >span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeDefined();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeNull();
    });

    it('Only list-state-done content visible', () => {
        listService.state = ProgressState.Done;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('rt-list-state-initial > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-failed > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-request-canceled  >span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-no-data > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-progress > span')).toBeNull();
        expect(nativeElement.querySelector('rt-list-state-done > span')).toBeDefined();
    });
});
