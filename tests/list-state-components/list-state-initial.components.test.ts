import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

import { RtList } from '../../src/core/list';
import { ListStateInitialComponent } from '../../src/list-state-components/list-state-initial.component';

class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-initial components', () => {
    let listStateInitialComponent: ListStateInitialComponent;
    let listStateInitialComponentFixture: any;
    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListStateInitialComponent],
            providers: [{ provide: RtList, useValue: listService }]
        });

        listStateInitialComponentFixture = TestBed.createComponent(ListStateInitialComponent);
        listStateInitialComponent = listStateInitialComponentFixture.componentInstance;
        listStateInitialComponent.ngOnInit();
        listStateInitialComponentFixture.detectChanges();
    });

    it('List-state-initial component should be defined', () => {
        expect(listStateInitialComponent).toBeDefined();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Cancelled', () => {
        listService.state = ProgressState.Cancelled;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Initial', () => {
        listService.state = ProgressState.Initial;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeTruthy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.NoData', () => {
        listService.state = ProgressState.NoData;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Progress', () => {
        listService.state = ProgressState.Progress;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Done', () => {
        listService.state = ProgressState.Done;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be visible with listService.state = ProgressState.Fail', () => {
        listService.state = ProgressState.Fail;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });
});
