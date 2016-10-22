import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

import { RtList } from '../../src/core/list';
import { ListStateFailedComponent } from '../../src/list-state-components/list-state-failed.component';

class MockList {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-failed component', () => {
    let listStateFailedComponent: ListStateFailedComponent;
    let listStateFailedComponentFixture: any;
    let listService: MockList;

    beforeAll(() => {
        listService = new MockList();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListStateFailedComponent],
            providers: [{ provide: RtList, useValue: listService }]
        });

        listStateFailedComponentFixture = TestBed.createComponent(ListStateFailedComponent);
        listStateFailedComponent = listStateFailedComponentFixture.componentInstance;
        listStateFailedComponent.ngOnInit();
        listStateFailedComponentFixture.detectChanges();
    });

    it('List state failed component should be defined', () => {
        expect(listStateFailedComponent).toBeDefined();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Cancelled', () => {
        listService.state = ProgressState.Cancelled;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Initial', () => {
        listService.state = ProgressState.Initial;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.NoData', () => {
        listService.state = ProgressState.NoData;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Progress', () => {
        listService.state = ProgressState.Progress;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be invisible with listService.state = ProgressState.Done', () => {
        listService.state = ProgressState.Done;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeFalsy();
    });

    it('List-state-failed component should be visible with listService.state = ProgressState.Fail', () => {
        listService.state = ProgressState.Fail;
        listStateFailedComponentFixture.detectChanges();
        expect(listStateFailedComponent.isVisible).toBeTruthy();
    });
});
