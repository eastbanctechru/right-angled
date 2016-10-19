import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';
import { ListStateDoneComponent } from '../src/list-directives/list-state/list-state-done.component';
import { RtListService } from '../src/list-directives/list-service';


class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-done component', function () {
    let listStateDoneComponent: ListStateDoneComponent;
    let listStateDoneComponentFixture: any;
    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
                providers: [{ provide: RtListService, useValue: listService }],
                declarations: [ListStateDoneComponent]
            });

        listStateDoneComponentFixture = TestBed.createComponent(ListStateDoneComponent);
        listStateDoneComponent = listStateDoneComponentFixture.componentInstance;
        listStateDoneComponent.ngOnInit();
        listStateDoneComponentFixture.detectChanges();
    });

    it('List-state-done component should be defined', function () {
        expect(listStateDoneComponent).toBeDefined();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Cancelled', function () {
        listService.state = ProgressState.Cancelled;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Fail', function () {
        listService.state = ProgressState.Fail;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Initial', function () {
        listService.state = ProgressState.Initial;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.NoData', function () {
        listService.state = ProgressState.NoData;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be invisible with listService.state = ProgressState.Progress', function () {
        listService.state = ProgressState.Progress;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeFalsy();
    });

    it('List-state-done component should be visible with listService.state = ProgressState.Done', function () {
        listService.state = ProgressState.Done;
        listStateDoneComponentFixture.detectChanges();
        expect(listStateDoneComponent.isVisible).toBeTruthy();
    });
});