import { ElementRef, OnChanges, OnDestroy, Renderer2, SimpleChange, Directive } from '@angular/core';

export abstract class EventsAttacherBase implements OnChanges, OnDestroy {
    public eventNames: string | string[];
    public unlisteners: any[] = [];
    constructor(private elementRef: ElementRef, public renderer: Renderer2, public eventListener: (evt: Event) => void) {}
    public ngOnChanges(changes: { eventNames?: SimpleChange }): void {
        if (changes.eventNames) {
            this.removeEventListeners();
            this.addEventListeners(this.adjustEvents(changes.eventNames.currentValue));
        }
    }
    public ngOnDestroy(): void {
        this.removeEventListeners();
    }
    private adjustEvents(eventsNames: string | string[]): string[] {
        return eventsNames ? (Array.isArray(eventsNames) ? eventsNames : [eventsNames]) : [];
    }
    private removeEventListeners(): void {
        this.unlisteners.forEach(listener => {
            if (typeof listener === 'function') {
                listener();
            }
        });
        this.unlisteners = [];
    }
    private addEventListeners(eventNames: string[]): void {
        if (!eventNames || !eventNames.length) {
            return;
        }
        this.unlisteners = eventNames.map(eventName => this.renderer.listen(this.elementRef.nativeElement, eventName, this.eventListener));
    }
}
