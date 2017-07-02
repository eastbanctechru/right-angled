import { ElementRef, OnChanges, OnDestroy, Renderer, SimpleChange } from "@angular/core";

export abstract class EventsAttacherBase implements OnChanges, OnDestroy {
    public eventNames: string | string[];
    public eventListeners: any[] = [];
    constructor(
        private elementRef: ElementRef,
        public renderer: Renderer,
        public eventListener: (evt: Event) => void
    ) {}
    public ngOnChanges(changes: { eventNames?: SimpleChange }): void {
        if (changes.eventNames) {
            this.removeListeners();
            this.addListeners(this.adjustEvents(changes.eventNames.currentValue));
        }
    }
    public ngOnDestroy(): void {
        this.removeListeners();
    }
    private adjustEvents(eventsNames: string | string[]): string[] {
        return eventsNames ? (Array.isArray(eventsNames) ? eventsNames : [eventsNames]) : [];
    }
    private removeListeners(): void {
        this.eventListeners.forEach(listener => {
            if (typeof listener === "function") {
                listener();
            }
        });
        this.eventListeners = [];
    }
    private addListeners(eventNames: string[]): void {
        if (!eventNames || !eventNames.length) {
            return;
        }
        this.eventListeners = eventNames.map(eventName =>
            this.renderer.listen(this.elementRef.nativeElement, eventName, this.eventListener)
        );
    }
}
