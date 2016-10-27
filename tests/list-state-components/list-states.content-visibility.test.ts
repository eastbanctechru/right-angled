import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RtList } from '../../src/core/list';
import { ListStateRequestCanceledComponent } from '../../src/list-state-components/list-state-request-canceled.component';
import { ListStateDoneComponent } from '../../src/list-state-components/list-state-done.component';
import { ListStateFailedComponent } from '../../src/list-state-components/list-state-failed.component';
import { ListStateInProgressComponent } from '../../src/list-state-components/list-state-in-progress.component';
import { ListStateInitialComponent } from '../../src/list-state-components/list-state-initial.component';
import { ListStateNoDataComponent } from '../../src/list-state-components/list-state-no-data.component';
import { ProgressState } from 'e2e4';

@Component({
 
    template: `<div id="testListStatesContainer">
                    <rt-list-state-failed id="failed">
                        <span id="failed-content">State is failed</span>
                    </rt-list-state-failed>
                    <rt-list-state-initial id="initial">
                        <span id="initial-content">State is initial</span>
                    </rt-list-state-initial>
                    <rt-list-state-request-canceled id="canceled">
                        <span id="canceled-content">State is request canceled</span>
                    </rt-list-state-request-canceled>
                    <rt-list-state-no-data id="no-data">
                        <span id="no-data-content">Stateis no data</span>
                    </rt-list-state-no-data>
                    <rt-list-state-progress id="progress">
                        <span id="progress-content">State is progress</span>
                    </rt-list-state-progress>
                    <rt-list-state-done id="done">
                        <span id="done-content">State is done</span>
                    </rt-list-state-done>
                </div>`
})
class ListStatesContentVisibilityTestComponent {
    constructor(public list: RtList) {}
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
    })

    it('Only list-state-initial content visible', () => {
        listService.state = ProgressState.Initial;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('#initial').querySelector('#initial-content') === null).toBeFalsy();
        expect(nativeElement.querySelector('#failed').querySelector('#failed-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#canceled').querySelector('#canceled-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#no-data').querySelector('#no-data-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#progress').querySelector('#progress-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#done').querySelector('#done-content') === null).toBeTruthy();
    })

    it('Only list-state-failed content visible', () => {
        listService.state = ProgressState.Fail;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('#initial').querySelector('#initial-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#failed').querySelector('#failed-content') === null).toBeFalsy();
        expect(nativeElement.querySelector('#canceled').querySelector('#canceled-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#no-data').querySelector('#no-data-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#progress').querySelector('#progress-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#done').querySelector('#done-content') === null).toBeTruthy();
    })

    it('Only list-state-canceled content visible', () => {
        listService.state = ProgressState.Cancelled;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('#initial').querySelector('#initial-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#failed').querySelector('#failed-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#canceled').querySelector('#canceled-content') === null).toBeFalsy();
        expect(nativeElement.querySelector('#no-data').querySelector('#no-data-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#progress').querySelector('#progress-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#done').querySelector('#done-content') === null).toBeTruthy();
    })


    it('Only list-state-no-data content visible', () => {
        listService.state = ProgressState.NoData;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('#initial').querySelector('#initial-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#failed').querySelector('#failed-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#canceled').querySelector('#canceled-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#no-data').querySelector('#no-data-content') === null).toBeFalsy();
        expect(nativeElement.querySelector('#progress').querySelector('#progress-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#done').querySelector('#done-content') === null).toBeTruthy();
    })

    it('Only list-state-progress content visible', () => {
        listService.state = ProgressState.Progress;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('#initial').querySelector('#initial-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#failed').querySelector('#failed-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#canceled').querySelector('#canceled-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#no-data').querySelector('#no-data-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#progress').querySelector('#progress-content') === null).toBeFalsy();
        expect(nativeElement.querySelector('#done').querySelector('#done-content') === null).toBeTruthy();
    })

    it('Only list-state-done content visible', () => {
        listService.state = ProgressState.Done;
        testComponentFixture.detectChanges();
        expect(nativeElement.querySelector('#initial').querySelector('#initial-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#failed').querySelector('#failed-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#canceled').querySelector('#canceled-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#no-data').querySelector('#no-data-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#progress').querySelector('#progress-content') === null).toBeTruthy();
        expect(nativeElement.querySelector('#done').querySelector('#done-content') === null).toBeFalsy();
    })
})