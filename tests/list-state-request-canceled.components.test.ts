import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';
import { ListStateRequestCanceledComponent } from '../src/list-directives/list-state/list-state-request-canceled.component';
import { RtListService } from '../src/list-directives/list-service';


class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-request-canceled components', function () {
    let listStateRequestCanceledComponent: ListStateRequestCanceledComponent;
    let listStateRequestCanceledComponentFixture: any;
    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
                providers: [{ provide: RtListService, useValue: listService }],
                declarations: [ListStateRequestCanceledComponent]
            });

        listStateRequestCanceledComponentFixture = TestBed.createComponent(ListStateRequestCanceledComponent);
        listStateRequestCanceledComponent = listStateRequestCanceledComponentFixture.componentInstance;
        listStateRequestCanceledComponent.ngOnInit();
        listStateRequestCanceledComponentFixture.detectChanges();
    });

    it('list-state-request-canceled component should be defined', function () {
        expect(listStateRequestCanceledComponent).toBeDefined();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Cancelled', function () {
        listService.state = ProgressState.Cancelled;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeTruthy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Initial', function () {
        listService.state = ProgressState.Initial;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.NoData', function () {
        listService.state = ProgressState.NoData;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Progress', function () {
        listService.state = ProgressState.Progress;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be invisible with listService.state = ProgressState.Done', function () {
        listService.state = ProgressState.Done;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });

    it('list-state-request-canceled component should be visible with listService.state = ProgressState.Fail', function () {
        listService.state = ProgressState.Fail;
        listStateRequestCanceledComponentFixture.detectChanges();
        expect(listStateRequestCanceledComponent.isVisible).toBeFalsy();
    });
});