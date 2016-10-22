import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

import { RtList } from '../../src/core/list';
import { ListStateNoDataComponent } from '../../src/list-state-components/list-state-no-data.component';

class MockList {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-no-data components', () => {
    let listStateNoDataComponent: ListStateNoDataComponent;
    let listStateNoDataComponentFixture: any;
    let listService: MockList;

    beforeAll(() => {
        listService = new MockList();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListStateNoDataComponent],
            providers: [{ provide: RtList, useValue: listService }]
        });

        listStateNoDataComponentFixture = TestBed.createComponent(ListStateNoDataComponent);
        listStateNoDataComponent = listStateNoDataComponentFixture.componentInstance;
        listStateNoDataComponent.ngOnInit();
        listStateNoDataComponentFixture.detectChanges();
    });

    it('list-state-no-data component should be defined', () => {
        expect(listStateNoDataComponent).toBeDefined();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Cancelled', () => {
        listService.state = ProgressState.Cancelled;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Initial', () => {
        listService.state = ProgressState.Initial;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.NoData', () => {
        listService.state = ProgressState.NoData;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeTruthy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Progress', () => {
        listService.state = ProgressState.Progress;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Done', () => {
        listService.state = ProgressState.Done;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be visible with listService.state = ProgressState.Fail', () => {
        listService.state = ProgressState.Fail;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });
});
