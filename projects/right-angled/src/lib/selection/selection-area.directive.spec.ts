import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RTSelectionService, RTSelectionEventsHelper, SelectionAreaDirective, SelectableDirective } from './selection.module';
import { KeyCodes } from './providers/selection-events-helper';
import { Component } from '@angular/core';

@Component({
  template: `
        <div
            rtSelectionArea
            [preventEventsDefaults]="preventEventsDefaults"
            [stopEventsPropagation]="stopEventsPropagation"
            [horizontal]="horizontal"
            [multiple]="multiple"
            [toggleOnly]="toggleOnly"
            [autoSelectFirst]="autoSelectFirst"
            [trackBy]="trackBy"
        >
            <div *ngFor="let item of items" [rtSelectable]="item"></div>
        </div>
    `
})
class HostComponent {
  public items: any[] = [1, 2, 3];
  public preventEventsDefaults = false;
  public stopEventsPropagation = false;
  public horizontal = false;
  public multiple = true;
  public toggleOnly = false;
  public autoSelectFirst = false;
  public trackBy: (index: number, item: any) => any = (index: number, item: any) => item;
}

@Component({
  template: `
        <div rtSelectionArea>
            <div *ngFor="let item of items" [rtSelectable]="item" rtSelectionArea>
                <div *ngFor="let item of item.items" [rtSelectable]="item"></div>
            </div>
        </div>
    `
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
    }
  ];
}

class SelectionServiceStub { }
class SelectionEventsHelperStub { }

describe('rtSelectionArea directive', () => {
  let fixture: ComponentFixture<HostComponent>;
  let selectionService: RTSelectionService;
  let selectionEventsHelper: RTSelectionEventsHelper;
  let selectionAreaDirective: SelectionAreaDirective;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HostComponent, NestedComponent, SelectionAreaDirective, SelectableDirective],
        providers: [
          { provide: RTSelectionService, useClass: SelectionServiceStub },
          { provide: RTSelectionEventsHelper, useClass: SelectionEventsHelperStub }
        ]
      });
      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
      selectionService = fixture.debugElement.children[0].injector.get(RTSelectionService);
      selectionEventsHelper = fixture.debugElement.children[0].injector.get(RTSelectionEventsHelper);
      selectionAreaDirective = fixture.debugElement.children[0].injector.get(SelectionAreaDirective);
    })
  );

  it('builds collection of child selection services for `RTSelectionService` and rebuilds it on change tracking cycle', fakeAsync(() => {
    const nestedFixture = TestBed.createComponent(NestedComponent);
    nestedFixture.detectChanges();
    selectionService = nestedFixture.debugElement.children[0].injector.get(RTSelectionService);
    expect(selectionService.childSelectionServices.length).toEqual(3);
    expect(selectionService.childSelectionServices).toEqual(
      nestedFixture.debugElement.children[0].queryAll(By.css('div')).map(dn => dn.injector.get(SelectionAreaDirective).selectionService)
    );
    nestedFixture.componentInstance.items.push({
      childItems: [{ number: 1 }],
      number: 4
    });
    setTimeout(() => {
      nestedFixture.detectChanges();
    }, 32);
    tick(32);
    expect(selectionService.childSelectionServices.length).toEqual(4);
    expect(selectionService.childSelectionServices).toEqual(
      nestedFixture.debugElement.children[0].queryAll(By.css('div')).map(dn => dn.injector.get(SelectionAreaDirective).selectionService)
    );
  }));

  it('acts as DI root for selection-related services', () => {
    expect(selectionService instanceof SelectionServiceStub).toBe(false);
    expect(selectionEventsHelper instanceof SelectionEventsHelperStub).toBe(false);
  });

  it('maps inputs parameters to selection service properties', () => {
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

  it('handles `keydown` event by calling `selectionEventsHelper.keyboardHandler`', () => {
    spyOn(selectionEventsHelper, 'keyboardHandler');
    fixture.debugElement.children[0].triggerEventHandler('keydown', {
      ctrlKey: true,
      keyCode: KeyCodes.ArrowDown,
      shiftKey: true
    });
    expect(selectionEventsHelper.keyboardHandler).toHaveBeenCalledWith(true, true, KeyCodes.ArrowDown);
  });

  it('calls event `preventDefault` method if `preventEventsDefaults` option specified and selection handler returns `true`', () => {
    fixture.componentInstance.preventEventsDefaults = true;
    fixture.detectChanges();
    const event = {
      ctrlKey: true,
      keyCode: KeyCodes.ArrowDown,
      preventDefault: () => {
        return;
      },
      shiftKey: true
    };
    spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(true);
    spyOn(event, 'preventDefault');
    fixture.debugElement.children[0].triggerEventHandler('keydown', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('does not call event `preventDefault` method if `preventEventsDefaults` option specified and selection handler returns `false`', () => {
    fixture.componentInstance.preventEventsDefaults = true;
    fixture.detectChanges();
    const event = {
      ctrlKey: true,
      keyCode: KeyCodes.ArrowDown,
      preventDefault: () => {
        return;
      },
      shiftKey: true
    };
    spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(false);
    spyOn(event, 'preventDefault');
    fixture.debugElement.children[0].triggerEventHandler('keydown', event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('calls event `stopPropagation` method if `stopEventsPropagation` option specified and selection handler returns `true`', () => {
    fixture.componentInstance.stopEventsPropagation = true;
    fixture.detectChanges();
    const event = {
      ctrlKey: true,
      keyCode: KeyCodes.ArrowDown,
      preventDefault: () => {
        return;
      },
      shiftKey: true,
      stopPropagation: () => {
        return;
      }
    };
    spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(true);
    spyOn(event, 'stopPropagation');
    fixture.debugElement.children[0].triggerEventHandler('keydown', event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('does not call event `stopPropagation` method if `stopEventsPropagation` option specified and selection handler returns `false`', () => {
    fixture.componentInstance.stopEventsPropagation = true;
    fixture.detectChanges();
    const event = {
      ctrlKey: true,
      keyCode: KeyCodes.ArrowDown,
      preventDefault: () => {
        return;
      },
      shiftKey: true,
      stopPropagation: () => {
        return;
      }
    };
    spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(false);
    spyOn(event, 'stopPropagation');
    fixture.debugElement.children[0].triggerEventHandler('keydown', event);
    expect(event.stopPropagation).not.toHaveBeenCalled();
  });

  it('throws error if specified `trackBy` input is not a function', () => {
    fixture.componentInstance.trackBy = 5 as any;
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('trackBy parameter value must be a function');
  });

  it('selects first item on change tracking cycle if `autoSelectFirst` is `true` and nothing is selected', () => {
    expect(fixture.componentInstance.autoSelectFirst).toEqual(false);
    fixture.componentInstance.autoSelectFirst = true;
    fixture.detectChanges();
    expect(selectionService.getSelectedIndexes()).toEqual([0]);
  });

  it('does not change selection on change tracking cycle if `autoSelectFirst` is `true` but something is already selected', () => {
    expect(fixture.componentInstance.autoSelectFirst).toEqual(false);
    selectionService.selectAll();
    fixture.componentInstance.autoSelectFirst = true;
    fixture.detectChanges();
    expect(selectionService.getSelectedIndexes()).toEqual([0, 1, 2]);
  });

  it('trims selection to first selected element on change tracking cycle if `multiple` option is `false`', () => {
    expect(fixture.componentInstance.multiple).toEqual(true);
    selectionService.selectIndex(1);
    selectionService.selectIndex(2, true);
    expect(selectionService.getSelectedIndexes()).toEqual([1, 2]);
    fixture.componentInstance.multiple = false;
    fixture.detectChanges();
    expect(selectionService.getSelectedIndexes()).toEqual([1]);
  });

  it('does not change selection on change tracking cycle if `multiple` option is `false` and single element is selected', () => {
    expect(fixture.componentInstance.multiple).toEqual(true);
    selectionService.selectIndex(1);
    fixture.componentInstance.multiple = false;
    fixture.detectChanges();
    expect(selectionService.getSelectedIndexes()).toEqual([1]);
  });

  it('runs `checkSelection` on change tracking cycle', fakeAsync(() => {
    spyOn(selectionService, 'checkSelection');
    fixture.componentInstance.items.push(4);
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
    }, 32);
    tick(32);
    expect(selectionService.checkSelection).toHaveBeenCalled();
  }));

  it('selects first element after selection check if `autoSelectFirst` is setted to `true`', fakeAsync(() => {
    selectionAreaDirective.autoSelectFirst = true;
    fixture.componentInstance.items.push(4);
    fixture.detectChanges();
    expect(selectionService.getSelectedIndexes()).toEqual([]);
    setTimeout(() => {
      fixture.detectChanges();
    }, 32);
    tick(32);
    expect(selectionService.getSelectedIndexes()).toEqual([0]);
  }));

  it('does not run `checkSelection` on change tracking cycle if `items` source is empty', fakeAsync(() => {
    spyOn(selectionService, 'checkSelection');
    fixture.componentInstance.items = [];
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
    }, 32);
    tick(32);
    expect(selectionService.checkSelection).not.toHaveBeenCalled();
  }));

  it('rebuilds `items` collection of selection service on change tracking cycle', fakeAsync(() => {
    fixture.componentInstance.items = [1, 2, 3, 4];
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
    }, 32);
    tick(32);
    expect(selectionService.items).toEqual([1, 2, 3, 4]);
  }));

  it('rebuilds `eventEmitters` collection of selection service on change tracking cycle', fakeAsync(() => {
    fixture.componentInstance.items = [1, 2, 3, 4];
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
    }, 32);
    tick(32);
    expect(selectionService.eventEmitters).toEqual(
      fixture.debugElement.children[0].queryAll(By.css('div')).map(dn => dn.injector.get(SelectableDirective))
    );
  }));

  it('updates indexes of selectable items on change tracking cycle', fakeAsync(() => {
    let selectables = fixture.debugElement.children[0].queryAll(By.css('div')).map(dn => dn.injector.get(SelectableDirective));
    expect(selectables.map(s => s.index)).toEqual([0, 1, 2]);
    fixture.componentInstance.items.unshift(0);
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
    }, 32);
    tick(32);
    selectables = fixture.debugElement.children[0].queryAll(By.css('div')).map(dn => dn.injector.get(SelectableDirective));
    expect(selectables.map(s => s.index)).toEqual([0, 1, 2, 3]);
  }));

  it('deselects items on `destroy`', () => {
    spyOn(selectionService, 'deselectAll');
    fixture.destroy();
    expect(selectionService.deselectAll).toHaveBeenCalled();
  });

  it('destroys `selectionService` on `destroy`', () => {
    spyOn(selectionService, 'destroy');
    fixture.destroy();
    expect(selectionService.destroy).toHaveBeenCalled();
  });

  /* tslint:disable:no-string-literal */
  it('destroys ContentChildren subscriptions on `destroy`', () => {
    spyOn(selectionAreaDirective['childSelectionAreasChangedSubscription'], 'unsubscribe');
    spyOn(selectionAreaDirective['selectablesChangedSubscription'], 'unsubscribe');
    fixture.destroy();
    expect(selectionAreaDirective['childSelectionAreasChangedSubscription'].unsubscribe).toHaveBeenCalled();
    expect(selectionAreaDirective['selectablesChangedSubscription'].unsubscribe).toHaveBeenCalled();
  });
  /* tslint:enable:no-string-literal */
});
