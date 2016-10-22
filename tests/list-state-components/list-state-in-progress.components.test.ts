import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

import { RtList } from '../../src/core/list';
import { ListStateInProgressComponent } from '../../src/list-state-components/list-state-in-progress.component';

class MockList {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-in-progress components', () => {
    let listStateInProgressComponent: ListStateInProgressComponent;
    let listStateInProgressComponentFixture: any;
    let listService: MockList;

    beforeAll(() => {
        listService = new MockList();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListStateInProgressComponent],
            providers: [{ provide: RtList, useValue: listService }]
        });

        listStateInProgressComponentFixture = TestBed.createComponent(ListStateInProgressComponent);
        listStateInProgressComponent = listStateInProgressComponentFixture.componentInstance;
        listStateInProgressComponent.ngOnInit();
        listStateInProgressComponentFixture.detectChanges();
    });

    it('List-state-in-progress component should be defined', () => {
        expect(listStateInProgressComponent).toBeDefined();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Cancelled', () => {
        listService.state = ProgressState.Cancelled;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Initial', () => {
        listService.state = ProgressState.Initial;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.NoData', () => {
        listService.state = ProgressState.NoData;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Progress', () => {
        listService.state = ProgressState.Progress;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeTruthy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Done', () => {
        listService.state = ProgressState.Done;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be visible with listService.state = ProgressState.Fail', () => {
        listService.state = ProgressState.Fail;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });
});
