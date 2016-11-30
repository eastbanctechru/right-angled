import { ElementRef, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

export abstract class EventsAttacherBase implements OnChanges, OnDestroy {
    public eventNames: string | string[];
    constructor(private elementRef: ElementRef, public eventListener: EventListener | EventListenerObject) {
    }
    public ngOnChanges(changes: { eventNames?: SimpleChange }): void {
        if (changes.eventNames) {
            this.removeListeners(this.adjustEvents(changes.eventNames.previousValue));
            this.addListeners(this.adjustEvents(changes.eventNames.currentValue));
        }
    }
    private adjustEvents(eventsNames: string | string[]): string[] {
        return eventsNames ? Array.isArray(eventsNames) ? eventsNames : [eventsNames] : [];
    }
    public ngOnDestroy(): void {
        this.removeListeners(this.adjustEvents(this.eventNames));
    }
    private removeListeners(eventNames: string[]): void {
        if (!eventNames || !eventNames.length) {
            return;
        }
        eventNames.forEach((eventName) =>
            (<HTMLElement>this.elementRef.nativeElement).removeEventListener(eventName, this.eventListener)
        );
    }
    private addListeners(eventNames: string[]): void {
        if (!eventNames || !eventNames.length) {
            return;
        }
        eventNames.forEach((eventName) =>
            (<HTMLElement>this.elementRef.nativeElement).addEventListener(eventName, this.eventListener)
        );
    }
}
