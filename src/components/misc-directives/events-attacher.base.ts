import { ElementRef, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

export abstract class EventsAttacherBase implements OnChanges, OnDestroy {
    public eventNames: Array<string>;
    constructor(private elementRef: ElementRef, private eventHandler: EventListener | EventListenerObject) {
    }
    public ngOnChanges(changes: { eventNames?: SimpleChange }): void {
        if (changes.eventNames) {
            this.removeListeners(changes.eventNames.previousValue);
            this.addListeners(changes.eventNames.currentValue);
        }
    }
    public ngOnDestroy(): void {
        this.removeListeners(this.eventNames);
    }
    private removeListeners(eventNames: string[]): void {
        if (!eventNames || !eventNames.length) {
            return;
        }
        eventNames.forEach(eventName =>
            (<HTMLElement>this.elementRef.nativeElement).removeEventListener(eventName, this.eventHandler)
        );
    }
    private addListeners(eventNames: string[]): void {
        if (!eventNames || !eventNames.length) {
            return;
        }
        eventNames.forEach(eventName =>
            (<HTMLElement>this.elementRef.nativeElement).addEventListener(eventName, this.eventHandler)
        );
    }
}
