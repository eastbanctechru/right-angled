import { RtFiltersService } from '../../src/core';
import { RegisterAsFilterDirective } from '../../src/filter-directives';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FiltersService, filter } from 'e2e4';

@Component({
    template: `<div *ngIf="renderFilter">
                    <rt-test-filter-target #ft [rtRegisterAsFilter]="ft">
                    </rt-test-filter-target>
                </div>`
})
class HostComponent {
    public renderFilter: boolean = true;
}
@Component({
    selector: 'rt-test-filter-target',
    template: `<div></div>`
})
class FilterTargetComponent {
    @filter() public filterProperty: string;
}

describe('rt-list-state-... components', () => {
    let sut: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
    let filtersService: RtFiltersService;

    beforeAll(() => {
        filtersService = new RtFiltersService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                FilterTargetComponent,
                RegisterAsFilterDirective
            ],
            providers: [{ provide: FiltersService, useValue: filtersService }]
        });

        fixture = TestBed.createComponent(HostComponent);
        sut = fixture.componentInstance;
    });

    it('Registers component as filter target when it\'s rendered', () => {
        sut.renderFilter = true;
        fixture.detectChanges();
        let targetComponent = fixture.debugElement.query(By.directive(RegisterAsFilterDirective)).componentInstance;
        expect(filtersService.appliedFiltersMap.get(targetComponent)).toBeDefined();
    });
    it('Unregisters component as filter target when it\'s not rendered', () => {
        sut.renderFilter = false;
        fixture.detectChanges();
        expect(filtersService.appliedFiltersMap.size).toEqual(0);
    });
});
