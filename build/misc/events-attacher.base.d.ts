import { ElementRef, OnChanges, OnDestroy, Renderer2, SimpleChange } from '@angular/core';
export declare abstract class EventsAttacherBase implements OnChanges, OnDestroy {
    private elementRef;
    renderer: Renderer2;
    eventListener: (evt: Event) => void;
    eventNames: string | string[];
    eventListeners: any[];
    constructor(elementRef: ElementRef, renderer: Renderer2, eventListener: (evt: Event) => void);
    ngOnChanges(changes: {
        eventNames?: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    private adjustEvents;
    private removeListeners;
    private addListeners;
}
