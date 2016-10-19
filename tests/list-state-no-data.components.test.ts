import { TestBed } from '@angular/core/testing';
import { ProgressState } from 'e2e4';
import { ListStateNoDataComponent } from '../src/list-directives/list-state/list-state-no-data.component';
import { RtListService } from '../src/list-directives/list-service';


class MockRtListService {
    public state: ProgressState = ProgressState.Initial;
}

describe('Testing the behavior of list-state-no-data components', function () {
    let listStateNoDataComponent: ListStateNoDataComponent;
    let listStateNoDataComponentFixture: any;
    let listService: MockRtListService;

    beforeAll(() => {
        listService = new MockRtListService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
                providers: [{ provide: RtListService, useValue: listService }],
                declarations: [ListStateNoDataComponent]
            });

        listStateNoDataComponentFixture = TestBed.createComponent(ListStateNoDataComponent);
        listStateNoDataComponent = listStateNoDataComponentFixture.componentInstance;
        listStateNoDataComponent.ngOnInit();
        listStateNoDataComponentFixture.detectChanges();
    });

    it('list-state-no-data component should be defined', function () {
        expect(listStateNoDataComponent).toBeDefined();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Cancelled', function () {
        listService.state = ProgressState.Cancelled;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Initial', function () {
        listService.state = ProgressState.Initial;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.NoData', function () {
        listService.state = ProgressState.NoData;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeTruthy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Progress', function () {
        listService.state = ProgressState.Progress;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be invisible with listService.state = ProgressState.Done', function () {
        listService.state = ProgressState.Done;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });

    it('list-state-no-data component should be visible with listService.state = ProgressState.Fail', function () {
        listService.state = ProgressState.Fail;
        listStateNoDataComponentFixture.detectChanges();
        expect(listStateNoDataComponent.isVisible).toBeFalsy();
    });
});