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
    let service: RTSelectionService;
    beforeEach(() => {
        service = new RTSelectionService();
        service.items = [];
        service.childSelectionServices = [
            new RTSelectionService(),
            new RTSelectionService(),
            new RTSelectionService()
        ];
        service.eventEmitters = [new StubElementEventsEmitter(), new StubElementEventsEmitter(), new StubElementEventsEmitter()];
        service.areaEventsEmitter = new StubEventsEmitter();
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        clock.restore();
    });
    describe('recursive selection', () => {
        it('Calls selectAll method of child services if recursive is true', () => {
            const spy1 = spyOn(service.childSelectionServices[0], 'selectAll');
            const spy2 = spyOn(service.childSelectionServices[1], 'selectAll');
            const spy3 = spyOn(service.childSelectionServices[2], 'selectAll');
            service.selectAll();
            clock.tick(100);
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
        });

        it('Doesn\'t call selectAll method of child services if recursive is false', () => {
            const spy1 = spyOn(service.childSelectionServices[0], 'selectAll');
            const spy2 = spyOn(service.childSelectionServices[1], 'selectAll');
            const spy3 = spyOn(service.childSelectionServices[2], 'selectAll');
            service.selectAll(false);
            clock.tick(100);
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
            expect(spy3).not.toHaveBeenCalled();
        });

        it('Calls deselectAll method of child services if recursive is true', () => {
            const spy1 = spyOn(service.childSelectionServices[0], 'deselectAll');
            const spy2 = spyOn(service.childSelectionServices[1], 'deselectAll');
            const spy3 = spyOn(service.childSelectionServices[2], 'deselectAll');
            service.deselectAll();
            clock.tick(100);
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
        });

        it('Doesn\'t call deselectAll method of child services if recursive is false', () => {
            const spy1 = spyOn(service.childSelectionServices[0], 'deselectAll');
            const spy2 = spyOn(service.childSelectionServices[1], 'deselectAll');
            const spy3 = spyOn(service.childSelectionServices[2], 'deselectAll');
            service.deselectAll(false);
            clock.tick(100);
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).not.toHaveBeenCalled();
            expect(spy3).not.toHaveBeenCalled();
        });
    });
    describe('processSelection ', () => {
        it('Doesn\'t call emitEvents if selected flag value is same as passed', () => {
            service.eventEmitters[0].selected = true;
            const emitSpy = spyOn(service, 'emitEvents');
            (service as any).processSelection({
                index: 0,
                item: {}
            } as SelectionTuple, true);
            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('Calls emitEvents if selection performed', () => {
            const emitSpy = spyOn(service, 'emitEvents');
            (service as any).processSelection({
                index: 0,
                item: {}
            } as SelectionTuple, true);
            expect(emitSpy).toHaveBeenCalled();
        });

        it('Calls emitEvents with areaEventsEmitter if it exists', () => {
            const emitSpy = spyOn(service, 'emitEvents');
            const tuple = {
                index: 0,
                item: {}
            } as SelectionTuple;
            (service as any).processSelection(tuple, true);
            expect(emitSpy).toHaveBeenCalledWith(service.areaEventsEmitter, true, tuple);
        });
        it('Doesn\'t call emitEvents with areaEventsEmitter if it doesn\'t exists', () => {
            const emitSpy = spyOn(service, 'emitEvents');
            service.areaEventsEmitter = null;
            const tuple = {
                index: 0,
                item: {}
            } as SelectionTuple;
            (service as any).processSelection(tuple, true);
            expect(emitSpy).not.toHaveBeenCalledWith(service.areaEventsEmitter, true, tuple);
        });

        it('Calls elementEventsEmitter.postProcessSelection on selection', () => {
            const processSpy = spyOn(service.eventEmitters[0], 'postProcessSelection');
            const tuple = {
                index: 0,
                item: {}
            } as SelectionTuple;
            (service as any).processSelection(tuple, true);
            expect(processSpy).toHaveBeenCalledWith(true);
        });
        it('Calls emitEvents with elementEventsEmitter if it exists', () => {
            const emitSpy = spyOn(service, 'emitEvents');
            const tuple = {
                index: 0,
                item: {}
            } as SelectionTuple;
            (service as any).processSelection(tuple, true);
            expect(emitSpy).toHaveBeenCalledWith(service.eventEmitters[0], true, tuple);
        });

        it('Doesn\'t call emitEvents with elementEventsEmitter if it doesn\'t exists', () => {
            const emitSpy = spyOn(service, 'emitEvents');
            const tuple = {
                index: 3,
                item: {}
            } as SelectionTuple;
            (service as any).processSelection(tuple, true);
            expect(emitSpy.calls.count()).toEqual(1);
            expect(emitSpy).toHaveBeenCalledWith(service.areaEventsEmitter, true, tuple);
        });
    });

    it('destroy method empties eventEmitters array and sets areaEventsEmitter to null', () => {
        service.destroy();
        expect(service.eventEmitters.length).toBe(0);
        expect(service.areaEventsEmitter).toBeNull();
    });
});
