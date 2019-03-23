import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RTFiltersService, RegisterAsFilterDirective, filter } from './filters.module';

@Component({
    template: `
        <div *ngIf="renderFilter">
            <rt-test-filter-target #ft [rtRegisterAsFilter]="ft"> </rt-test-filter-target>
        </div>
    `
})
class HostComponent {
    public renderFilter = true;
}
@Component({
    selector: 'rt-test-filter-target',
    template: `
        <div></div>
    `
})
class FilterTargetComponent {
    @filter() public filterProperty: string;
}

describe('rtRegisterAsFilter directive', () => {
    let sut: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
    let filtersService: RTFiltersService;

    beforeAll(() => {
        filtersService = new RTFiltersService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, FilterTargetComponent, RegisterAsFilterDirective],
            providers: [{ provide: RTFiltersService, useValue: filtersService }]
        });

        fixture = TestBed.createComponent(HostComponent);
        sut = fixture.componentInstance;
    });

    it('registers component instance as filter target when it is rendered', () => {
        sut.renderFilter = true;
        fixture.detectChanges();
        const targetComponent = fixture.debugElement.query(By.directive(RegisterAsFilterDirective)).componentInstance;
        expect(filtersService.appliedFiltersMap.get(targetComponent)).toBeDefined();
    });
    it('unregisters component instance as filter target when it is not rendered', () => {
        sut.renderFilter = false;
        fixture.detectChanges();
        expect(filtersService.appliedFiltersMap.size).toEqual(0);
    });
});
