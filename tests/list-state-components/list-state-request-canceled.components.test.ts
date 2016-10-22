import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';

import { RtList } from '../../src/core/list';
import { ListStateRequestCanceledComponent } from '../../src/list-state-components/list-state-request-canceled.component';

class MockList {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-request-canceled components', () => {
    let listStateRequestCanceledComponent: ListStateRequestCanceledComponent;
    let listStateRequestCanceledComponentFixture: any;
    let listService: MockList;

    beforeAll(() => {
        listService = new MockList();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListStateRequestCanceledComponent],
            providers: [{ provide: RtList, useValue: listService }]
        });

        listStateRequestCanceledComponentFixture = TestBed.createComponent(ListStateRequestCanceledComponent);
        listStateRequestCanceledComponent = listStateRequestCanceledComponentFixture.componentInstance;
        listStateRequestCanceledComponent.ngOnInit();
        listStateRequestCanceledComponentFixture.detectChanges();
    });

    it('list-state-request-canceled component should be defined', () => {
        expect(listStateRequestCanceledComponent).toBeDefined();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Cancelled', () => {
        listService.state = ProgressState.Cancelled;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeTruthy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Initial', () => {
        listService.state = ProgressState.Initial;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.NoData', () => {
        listService.state = ProgressState.NoData;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Progress', () => {
        listService.state = ProgressState.Progress;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Done', () => {
        listService.state = ProgressState.Done;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be visible with listService.state = ProgressState.Fail', () => {
        listService.state = ProgressState.Fail;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });
});
