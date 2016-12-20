// tslint:disable:max-classes-per-file
import { RTSelectionEventsHelper, RTSelectionService } from '../../src/core/index';
import { SelectableDirective, SelectionAreaDirective } from '../../src/selection-directives/index';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KeyCodes } from 'e2e4';

@Component({
    template: `<div rtSelectionArea 
    [preventEventsDefaults]="preventEventsDefaults"
    [stopEventsPropagation]="stopEventsPropagation"
    [horizontal]="horizontal"
    [multiple]="multiple"
    [toggleOnly]="toggleOnly"
    [autoSelectFirst]="autoSelectFirst"
    [trackBy]="trackBy">
        <div *ngFor="let item of items" [rtSelectable]="item"></div>
    </div>`
})
class HostComponent {
    public items: any[] = [1, 2, 3];
    public preventEventsDefaults: boolean = false;
    public stopEventsPropagation: boolean = false;
    public horizontal: boolean = false;
    public multiple: boolean = true;
    public toggleOnly: boolean = false;
    public autoSelectFirst: boolean = false;
    public trackBy: (index: number, item: any) => any = (index: number, item: any) => item;
}

@Component({
    template: `<div rtSelectionArea>
                    <div *ngFor="let item of items" [rtSelectable]="item" rtSelectionArea>
                        <div *ngFor="let item of item.items" [rtSelectable]="item">
                        </div>
                    </div>
                </div>`
})
class NestedComponent {
    public items: any[] = [
        {
            childItems: [{ number: 1 }, { number: 2 }, { number: 3 }],
            number: 1
        },
        {
            childItems: [{ number: 1 }, { number: 2 }, { number: 3 }],
            number: 2
        },
        {
            childItems: [{ number: 1 }, { number: 2 }, { number: 3 }],
            number: 3
        }];
}

class SelectionServiceStub {
}
class SelectionEventsHelperStub {
}

describe('rtSelectionArea directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let selectionService: RTSelectionService;
    let selectionEventsHelper: RTSelectionEventsHelper;
    let selectionAreaDirective: SelectionAreaDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                NestedComponent,
                SelectionAreaDirective,
                SelectableDirective
            ],
            providers: [
                { provide: RTSelectionService, useClass: SelectionServiceStub },
                { provide: RTSelectionEventsHelper, useClass: SelectionEventsHelperStub }
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        selectionService = fixture.debugElement.children[0].injector.get(RTSelectionService);
        selectionEventsHelper = fixture.debugElement.children[0].injector.get(RTSelectionEventsHelper);
        selectionAreaDirective = <SelectionAreaDirective>fixture.debugElement.children[0].injector.get(SelectionAreaDirective);
    });

    it('Builds collection of child selection services for RTSelectionService and rebuilds it on change tracking cycle', () => {
        let nestedFixture = TestBed.createComponent(NestedComponent);
        nestedFixture.detectChanges();
        selectionService = nestedFixture.debugElement.children[0].injector.get(RTSelectionService);
        expect(selectionService.childSelectionServices.length).toEqual(3);
        expect(selectionService.childSelectionServices).toEqual(nestedFixture.debugElement.children[0].queryAll(By.css('div')).map((dn) => dn.injector.get(SelectionAreaDirective).selectionService));
        nestedFixture.componentInstance.items.push({
            childItems: [{ number: 1 }],
            number: 4
        });
        nestedFixture.detectChanges();
        expect(selectionService.childSelectionServices.length).toEqual(4);
        expect(selectionService.childSelectionServices).toEqual(nestedFixture.debugElement.children[0].queryAll(By.css('div')).map((dn) => dn.injector.get(SelectionAreaDirective).selectionService));
    });

    it('Acts as DI root for selection-related services', () => {
        expect(selectionService instanceof SelectionServiceStub).toBeFalsy();
        expect(selectionEventsHelper instanceof SelectionEventsHelperStub).toBeFalsy();
    });

    it('Proxies inputs to selection service properties', () => {
        expect(fixture.componentInstance.autoSelectFirst).toEqual(selectionAreaDirective.autoSelectFirst);
        fixture.componentInstance.autoSelectFirst = !fixture.componentInstance.autoSelectFirst;
        expect(fixture.componentInstance.autoSelectFirst).not.toEqual(selectionAreaDirective.autoSelectFirst);
        fixture.detectChanges();
        expect(fixture.componentInstance.autoSelectFirst).toEqual(selectionAreaDirective.autoSelectFirst);

        expect(fixture.componentInstance.horizontal).toEqual(selectionEventsHelper.horizontal);
        fixture.componentInstance.horizontal = !fixture.componentInstance.horizontal;
        expect(fixture.componentInstance.horizontal).not.toEqual(selectionEventsHelper.horizontal);
        fixture.detectChanges();
        expect(fixture.componentInstance.horizontal).toEqual(selectionEventsHelper.horizontal);

        expect(fixture.componentInstance.multiple).toEqual(selectionEventsHelper.multiple);
        fixture.componentInstance.multiple = !fixture.componentInstance.multiple;
        expect(fixture.componentInstance.multiple).not.toEqual(selectionEventsHelper.multiple);
        fixture.detectChanges();
        expect(fixture.componentInstance.multiple).toEqual(selectionEventsHelper.multiple);

        expect(fixture.componentInstance.preventEventsDefaults).toEqual(selectionEventsHelper.preventEventsDefaults);
        fixture.componentInstance.preventEventsDefaults = !fixture.componentInstance.preventEventsDefaults;
        expect(fixture.componentInstance.preventEventsDefaults).not.toEqual(selectionEventsHelper.preventEventsDefaults);
        fixture.detectChanges();
        expect(fixture.componentInstance.preventEventsDefaults).toEqual(selectionEventsHelper.preventEventsDefaults);

        expect(fixture.componentInstance.stopEventsPropagation).toEqual(selectionEventsHelper.stopEventsPropagation);
        fixture.componentInstance.stopEventsPropagation = !fixture.componentInstance.stopEventsPropagation;
        expect(fixture.componentInstance.stopEventsPropagation).not.toEqual(selectionEventsHelper.stopEventsPropagation);
        fixture.detectChanges();
        expect(fixture.componentInstance.stopEventsPropagation).toEqual(selectionEventsHelper.stopEventsPropagation);

        expect(fixture.componentInstance.toggleOnly).toEqual(selectionEventsHelper.toggleOnly);
        fixture.componentInstance.toggleOnly = !fixture.componentInstance.toggleOnly;
        expect(fixture.componentInstance.toggleOnly).not.toEqual(selectionEventsHelper.toggleOnly);
        fixture.detectChanges();
        expect(fixture.componentInstance.toggleOnly).toEqual(selectionEventsHelper.toggleOnly);

        expect(fixture.componentInstance.trackBy).toEqual(selectionService.trackByFn);
        fixture.componentInstance.trackBy = (index: number) => index;
        expect(fixture.componentInstance.trackBy).not.toEqual(selectionService.trackByFn);
        fixture.detectChanges();
        expect(fixture.componentInstance.trackBy).toEqual(selectionService.trackByFn);
    });

    it('Handles keydown event by calling selectionEventsHelper.keyboardHandler', () => {
        spyOn(selectionEventsHelper, 'keyboardHandler');
        fixture.debugElement.children[0].triggerEventHandler('keydown', { ctrlKey: true, keyCode: KeyCodes.ArrowDown, shiftKey: true });
        expect(selectionEventsHelper.keyboardHandler).toHaveBeenCalledWith(true, true, KeyCodes.ArrowDown);
    });

    it('Calls event \'preventDefault\' method if \'preventEventsDefaults\' option specified and selection handler returns true', () => {
        fixture.componentInstance.preventEventsDefaults = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(true);
        spyOn(event, 'preventDefault');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('Doesn\'t call event \'preventDefault\' method if \'preventEventsDefaults\' option specified and selection handler returns false', () => {
        fixture.componentInstance.preventEventsDefaults = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(false);
        spyOn(event, 'preventDefault');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('Calls event \'stopPropagation\' method if \'stopEventsPropagation\' option specified and selection handler returns true', () => {
        fixture.componentInstance.stopEventsPropagation = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true, stopPropagation: () => { return; } };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(true);
        spyOn(event, 'stopPropagation');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('Doesn\'t call event \'stopPropagation\' method if \'stopEventsPropagation\' option specified and selection handler returns false', () => {
        fixture.componentInstance.stopEventsPropagation = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true, stopPropagation: () => { return; } };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(false);
        spyOn(event, 'stopPropagation');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('Throws error if specified trackBy input is not a function', () => {
        fixture.componentInstance.trackBy = <any>5;
        expect(() => fixture.detectChanges()).toThrowError('Error in ./HostComponent class HostComponent - inline template:7:4 caused by: trackBy parameter value must be a function');
    });

    it('Selects first item on change tracking cycle if autoSelectFirst is true and nothings selected', () => {
        expect(fixture.componentInstance.autoSelectFirst).toEqual(false);
        fixture.componentInstance.autoSelectFirst = true;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([0]);
    });

    it('Doesn\'t change selection on change tracking cycle if autoSelectFirst is true but something already selected', () => {
        expect(fixture.componentInstance.autoSelectFirst).toEqual(false);
        selectionService.selectAll();
        fixture.componentInstance.autoSelectFirst = true;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([0, 1, 2]);
    });

    it('Trims selection to first selected element on change tracking cycle if multiple setted to false', () => {
        expect(fixture.componentInstance.multiple).toEqual(true);
        selectionService.selectIndex(1);
        selectionService.selectIndex(2, true);
        expect(selectionService.getSelectedIndexes()).toEqual([1, 2]);
        fixture.componentInstance.multiple = false;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([1]);
    });

    it('Doesn\'t change selection on change tracking cycle if \'multiple\' setted to false and single element is selected', () => {
        expect(fixture.componentInstance.multiple).toEqual(true);
        selectionService.selectIndex(1);
        fixture.componentInstance.multiple = false;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([1]);
    });

    it('Runs \'checkSelection\' on change tracking cycle', (done) => {
        spyOn(selectionService, 'checkSelection');
        fixture.componentInstance.items.push(4);
        fixture.detectChanges();
        setTimeout(() => {
            expect(selectionService.checkSelection).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('Selects first element after selection check if \'autoSelectFirst\' is setted to true', (done) => {
        selectionAreaDirective.autoSelectFirst = true;
        fixture.componentInstance.items.push(4);
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([]);
        setTimeout(() => {
            expect(selectionService.getSelectedIndexes()).toEqual([0]);
            done();
        }, 0);
    });

    it('Doesn\'t runs \'checkSelection\' on change tracking cycle if items source is empty', (done) => {
        spyOn(selectionService, 'checkSelection');
        fixture.componentInstance.items = [];
        fixture.detectChanges();
        setTimeout(() => {
            expect(selectionService.checkSelection).not.toHaveBeenCalled();
            done();
        }, 0);
    });

    it('Rebuilds \'items\' collection of selection service on change tracking cycle', () => {
        fixture.componentInstance.items = [1, 2, 3, 4];
        fixture.detectChanges();
        expect(selectionService.items).toEqual([1, 2, 3, 4]);
    });

    it('Rebuilds \'eventEmitters\' collection of selection service on change tracking cycle', () => {
        fixture.componentInstance.items = [1, 2, 3, 4];
        fixture.detectChanges();
        expect(selectionService.eventEmitters).toEqual(fixture.debugElement.children[0].queryAll(By.css('div')).map((dn) => dn.injector.get(SelectableDirective)));
    });

    it('Updates indexes of selectable items on  change tracking cycle', () => {
        let selectables = fixture.debugElement.children[0].queryAll(By.css('div')).map((dn) => dn.injector.get(SelectableDirective));
        expect(selectables.map((s) => s.index)).toEqual([0, 1, 2]);
        fixture.componentInstance.items.unshift(0);
        fixture.detectChanges();
        expect(selectables.map((s) => s.index)).toEqual([1, 2, 3]);
    });

    it('Deselects items on destroy', () => {
        spyOn(selectionService, 'deselectAll');
        fixture.destroy();
        expect(selectionService.deselectAll).toHaveBeenCalled();
    });

    it('Destroys selectionService on destroy', () => {
        spyOn(selectionService, 'destroy');
        fixture.destroy();
        expect(selectionService.destroy).toHaveBeenCalled();
    });

    it('Destroys ContentChildren subscriptions on destroy', () => {
        spyOn(selectionAreaDirective.checkboxesSubscription, 'unsubscribe');
        spyOn(selectionAreaDirective.itemsSubscription, 'unsubscribe');
        spyOn(selectionAreaDirective.childSelectionAreasSubscription, 'unsubscribe');
        fixture.destroy();
        expect(selectionAreaDirective.checkboxesSubscription.unsubscribe).toHaveBeenCalled();
        expect(selectionAreaDirective.itemsSubscription.unsubscribe).toHaveBeenCalled();
        expect(selectionAreaDirective.childSelectionAreasSubscription.unsubscribe).toHaveBeenCalled();
    });
});
