import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';
import { ListStateFailedComponent } from '../src/list-directives/list-state/list-state-failed.component';
import { RtListService } from '../src/list-directives/list-service';


class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-failed component', function () {
    let listStateFailedComponent: ListStateFailedComponent;
    let listStateFailedComponentFixture: any;
    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
                providers: [{ provide: RtListService, useValue: listService }],
                declarations: [ListStateFailedComponent]
            });

        listStateFailedComponentFixture = TestBed.createComponent(ListStateFailedComponent);
        listStateFailedComponent = listStateFailedComponentFixture.componentInstance;
        listStateFailedComponent.ngOnInit();
        listStateFailedComponentFixture.detectChanges();
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