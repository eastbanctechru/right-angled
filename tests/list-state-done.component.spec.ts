import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ListStateDoneComponent } from '../src/list-directives/list-state/list-state-done.component'
import { RtListService } from '../src/list-directives/list-service';
import { AsyncSubscriber } from '../src/core/async-subscriber';
import { SortingsService, FiltersService  } from 'e2e4';
import {RtSelectionService} from '../src/core/selection/selection-service';

import {MockFiltersService} from './MockFiltersService';
import {MockRtListService} from './MockRtListService';

import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'

describe('List state components test', function() {

    let component: ListStateDoneComponent;
    let fixture: any;

    beforeEach(() => {

        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
        .configureTestingModule({
            providers: [{provide: RtListService, useClass: MockRtListService}, AsyncSubscriber, SortingsService, {provide: FiltersService, useClass: MockFiltersService}, RtSelectionService],
            declarations: [ListStateDoneComponent],
            imports: [ReactiveFormsModule]
        }); 

        fixture = TestBed.createComponent(ListStateDoneComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should have a defined component', function (){
        expect(component.isVisible).toBeDefined();
        expect(component).toBeDefined();

        expect(component.isVisible).toBe(false);

        component.listService.testChangeState();
        fixture.detectChanges();
        expect(component.isVisible).toBe(true);
    });
});