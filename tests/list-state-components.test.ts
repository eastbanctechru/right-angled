import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { ProgressState } from 'e2e4';

import { ListStateDoneComponent } from '../src/list-directives/list-state/list-state-done.component';
import { ListStateFailedComponent } from '../src/list-directives/list-state/list-state-failed.component';
import { RtListService } from '../src/list-directives/list-service';


class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state components', function () {
    let listStateDoneComponent: ListStateDoneComponent;
    let listStateFailedComponent: ListStateFailedComponent;

    let listStateDoneComponentFixture: any;
    let listStateFailedComponentFixture: any;

    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
                providers: [{ provide: RtListService, useValue: listService }],
                declarations: [ListStateDoneComponent, ListStateFailedComponent]
            });

        listStateDoneComponentFixture = TestBed.createComponent(ListStateDoneComponent);
        listStateFailedComponentFixture = TestBed.createComponent(ListStateFailedComponent);

        listStateDoneComponent = listStateDoneComponentFixture.componentInstance;
        listStateFailedComponent = listStateFailedComponentFixture.componentInstance;

        listStateDoneComponent.ngOnInit();
        listStateFailedComponent.ngOnInit();

        listStateDoneComponentFixture.detectChanges();
        listStateFailedComponentFixture.detectChanges();
    });

    it('List-state-done component should be defined', function () {
        expect(listStateDoneComponent).toBeDefined();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Cancelled', function () {
        listService.state = ProgressState.Cancelled;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Fail', function () {
        listService.state = ProgressState.Fail;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Initial', function () {
        listService.state = ProgressState.Initial;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.NoData', function () {
        listService.state = ProgressState.NoData;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Progress', function () {
        listService.state = ProgressState.Progress;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be visible with listService.state = ProgressState.Done', function () {
        listService.state = ProgressState.Done;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeTruthy();
    });



    it('List state failed component should be defined', function () {
        expect(listStateFailedComponent).toBeDefined();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Cancelled', function () {
        listService.state = ProgressState.Cancelled;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Initial', function () {
        listService.state = ProgressState.Initial;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.NoData', function () {
        listService.state = ProgressState.NoData;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Progress', function () {
        listService.state = ProgressState.Progress;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Done', function () {
        listService.state = ProgressState.Done;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be visible with listService.state = ProgressState.Fail', function () {
        listService.state = ProgressState.Fail;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeTruthy();
    });
});