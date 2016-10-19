import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';
import { ListStateInProgressComponent } from '../src/list-directives/list-state/list-state-in-progress.component';
import { RtListService } from '../src/list-directives/list-service';


class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-in-progress components', function () {
    let listStateInProgressComponent: ListStateInProgressComponent;
    let listStateInProgressComponentFixture: any;
    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
                providers: [{ provide: RtListService, useValue: listService }],
                declarations: [ListStateInProgressComponent]
            });

        listStateInProgressComponentFixture = TestBed.createComponent(ListStateInProgressComponent);
        listStateInProgressComponent = listStateInProgressComponentFixture.componentInstance;
        listStateInProgressComponent.ngOnInit();
        listStateInProgressComponentFixture.detectChanges();
    });

    it('List-state-in-progress component should be defined', function () {
        expect(listStateInProgressComponent).toBeDefined();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Cancelled', function () {
        listService.state = ProgressState.Cancelled;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Initial', function () {
        listService.state = ProgressState.Initial;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.NoData', function () {
        listService.state = ProgressState.NoData;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Progress', function () {
        listService.state = ProgressState.Progress;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeTruthy();
    });

    it('List-state-in-progress component should be invisible with listService.state = ProgressState.Done', function () {
        listService.state = ProgressState.Done;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });

    it('List-state-in-progress component should be visible with listService.state = ProgressState.Fail', function () {
        listService.state = ProgressState.Fail;
        listStateInProgressComponentFixture.detectChanges();
        expect(listStateInProgressComponent.isVisible).toBeFalsy();
    });
});