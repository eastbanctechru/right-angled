import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

import { RtList } from '../../src/core/list';
import { ListStateDoneComponent } from '../../src/list-state-components/list-state-done.component';

class MockList {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-done component', () => {
    let listStateDoneComponent: ListStateDoneComponent;
    let listStateDoneComponentFixture: any;
    let listService: MockList;

    beforeAll(() => {
        listService = new MockList();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListStateDoneComponent],
            providers: [{ provide: RtList, useValue: listService }]
        });

        listStateDoneComponentFixture = TestBed.createComponent(ListStateDoneComponent);
        listStateDoneComponent = listStateDoneComponentFixture.componentInstance;
        listStateDoneComponent.ngOnInit();
        listStateDoneComponentFixture.detectChanges();
    });

    it('List-state-done component should be defined', () => {
        expect(listStateDoneComponent).toBeDefined();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Cancelled', () => {
        listService.state = ProgressState.Cancelled;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Fail', () => {
        listService.state = ProgressState.Fail;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Initial', () => {
        listService.state = ProgressState.Initial;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.NoData', () => {
        listService.state = ProgressState.NoData;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Progress', () => {
        listService.state = ProgressState.Progress;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be visible with listService.state = ProgressState.Done', () => {
        listService.state = ProgressState.Done;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeTruthy();
    });
});
