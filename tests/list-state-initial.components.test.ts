import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';
import { ListStateInitialComponent } from '../src/list-directives/list-state/list-state-initial.component';
import { RtListService } from '../src/list-directives/list-service';


class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-initial components', function () {
    let listStateInitialComponent: ListStateInitialComponent;
    let listStateInitialComponentFixture: any;
    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
                providers: [{ provide: RtListService, useValue: listService }],
                declarations: [ListStateInitialComponent]
            });

        listStateInitialComponentFixture = TestBed.createComponent(ListStateInitialComponent);
        listStateInitialComponent = listStateInitialComponentFixture.componentInstance;
        listStateInitialComponent.ngOnInit();
        listStateInitialComponentFixture.detectChanges();
    });

    it('List-state-initial component should be defined', function () {
        expect(listStateInitialComponent).toBeDefined();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Cancelled', function () {
        listService.state = ProgressState.Cancelled;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Initial', function () {
        listService.state = ProgressState.Initial;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeTruthy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.NoData', function () {
        listService.state = ProgressState.NoData;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Progress', function () {
        listService.state = ProgressState.Progress;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be invisible with listService.state = ProgressState.Done', function () {
        listService.state = ProgressState.Done;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });

    it('list-state-initial component should be visible with listService.state = ProgressState.Fail', function () {
        listService.state = ProgressState.Fail;
        listStateInitialComponentFixture.detectChanges();
        expect(listStateInitialComponent.isVisible).toBeFalsy();
    });
});