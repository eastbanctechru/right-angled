// tslint:disable:max-classes-per-file
import { SelectionElementEventsEmitter } from './../../src/core/selection/selection-element-events-emitter';
import { RTSelectionEvent } from './../../src/core/selection/selection-event';
import { SelectionEventsEmitter } from './../../src/core/selection/selection-events-emitter';
import { RTSelectionService } from './../../src/core/selection/selection-service';

import { EventEmitter } from '@angular/core';
import { SelectionTuple } from 'e2e4';
import * as sinon from 'sinon';

class StubElementEventsEmitter implements SelectionElementEventsEmitter {
    public itemSelected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    public itemDeselected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    public selectionChanged: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();

    public selected: boolean = false;
    public postProcessSelection(): void {
        return;
    }
}

class StubEventsEmitter implements SelectionEventsEmitter {
    public itemSelected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    public itemDeselected: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
    public selectionChanged: EventEmitter<RTSelectionEvent> = new EventEmitter<RTSelectionEvent>();
}

describe('RTSelectionService', () => {
    let clock: sinon.SinonFakeTimers;
    let selectionService: RTSelectionService;
    beforeEach(() => {
        selectionService = new RTSelectionService();
        selectionService.items = [];
        selectionService.childSelectionServices = [
            new RTSelectionService(),
            new RTSelectionService(),
            new RTSelectionService()
        ];
        selectionService.eventEmitters = [new StubElementEventsEmitter(), new StubElementEventsEmitter(), new StubElementEventsEmitter()];
        selectionService.areaEventsEmitter = new StubEventsEmitter();
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        clock.restore();
    });
    describe('recursive selection', () => {
        let selectSpy1: jasmine.Spy;
        let selectSpy2: jasmine.Spy;
        let selectSpy3: jasmine.Spy;
        let deselectSpy1: jasmine.Spy;
        let deselectSpy2: jasmine.Spy;
        let deselectSpy3: jasmine.Spy;
        beforeEach(() => {
            selectSpy1 = spyOn(selectionService.childSelectionServices[0], 'selectAll');
            selectSpy2 = spyOn(selectionService.childSelectionServices[1], 'selectAll');
            selectSpy3 = spyOn(selectionService.childSelectionServices[2], 'selectAll');
            deselectSpy1 = spyOn(selectionService.childSelectionServices[0], 'deselectAll');
            deselectSpy2 = spyOn(selectionService.childSelectionServices[1], 'deselectAll');
            deselectSpy3 = spyOn(selectionService.childSelectionServices[2], 'deselectAll');
        });

        it('Calls selectAll method of child services if recursive is true', () => {
            selectionService.selectAll();
            clock.tick(100);
            expect(selectSpy1).toHaveBeenCalled();
            expect(selectSpy2).toHaveBeenCalled();
            expect(selectSpy3).toHaveBeenCalled();
        });

        it('Doesn\'t call selectAll method of child services if recursive is false', () => {
            selectionService.selectAll(false);
            clock.tick(100);
            expect(selectSpy1).not.toHaveBeenCalled();
            expect(selectSpy2).not.toHaveBeenCalled();
            expect(selectSpy3).not.toHaveBeenCalled();
        });

        it('Calls deselectAll method of child services if recursive is true', () => {
            selectionService.deselectAll();
            clock.tick(100);
            expect(deselectSpy1).toHaveBeenCalled();
            expect(deselectSpy2).toHaveBeenCalled();
            expect(deselectSpy3).toHaveBeenCalled();
        });

        it('Doesn\'t call deselectAll method of child services if recursive is false', () => {
            selectionService.deselectAll(false);
            clock.tick(100);
            expect(deselectSpy1).not.toHaveBeenCalled();
            expect(deselectSpy2).not.toHaveBeenCalled();
            expect(deselectSpy3).not.toHaveBeenCalled();
        });
    });
    describe('processSelection ', () => {
        let emitSpy: jasmine.Spy;
        let tuple: SelectionTuple;
        beforeEach(() => {
            emitSpy = spyOn(selectionService, 'emitEvents');
            tuple = {
                index: 0,
                item: {}
            };
        });
        it('Doesn\'t call "emitEvents" if selected flag value is same as passed', () => {
            selectionService.eventEmitters[0].selected = true;
            selectionService.processSelection(tuple, true);
            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('Calls "emitEvents" if selection performed', () => {
            selectionService.processSelection(tuple, true);
            expect(emitSpy).toHaveBeenCalled();
        });

        it('Calls "emitEvents" with areaEventsEmitter if it exists', () => {
            selectionService.processSelection(tuple, true);
            expect(emitSpy).toHaveBeenCalledWith(selectionService.areaEventsEmitter, true, tuple);
        });
        it('Doesn\'t call "emitEvents" with areaEventsEmitter if it doesn\'t exists', () => {
            selectionService.areaEventsEmitter = null;
            selectionService.processSelection(tuple, true);
            expect(emitSpy).not.toHaveBeenCalledWith(selectionService.areaEventsEmitter, true, tuple);
        });

        it('Calls "emitEvents" with elementEventsEmitter if it exists', () => {
            selectionService.processSelection(tuple, true);
            expect(emitSpy).toHaveBeenCalledWith(selectionService.eventEmitters[0], true, tuple);
        });

        it('Doesn\'t call "emitEvents" with elementEventsEmitter if element doesn\'t exists', () => {
            tuple.index = 3;
            selectionService.processSelection(tuple, true);
            expect(emitSpy.calls.count()).toEqual(1);
            expect(emitSpy).toHaveBeenCalledWith(selectionService.areaEventsEmitter, true, tuple);
        });
        it('Calls "elementEventsEmitter.postProcessSelection" on selection', () => {
            const processSpy = spyOn(selectionService.eventEmitters[0], 'postProcessSelection');
            selectionService.processSelection(tuple, true);
            expect(processSpy).toHaveBeenCalledWith(true);
        });
    });

    it('"destroy" method empties "eventEmitters" array and sets "areaEventsEmitter" to null', () => {
        selectionService.destroy();
        expect(selectionService.eventEmitters.length).toBe(0);
        expect(selectionService.areaEventsEmitter).toBeNull();
    });
});
