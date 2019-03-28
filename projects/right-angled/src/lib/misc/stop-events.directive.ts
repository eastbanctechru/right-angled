import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { EventsAttacherBase } from './events-attacher.base';

@Directive({
    selector: '[rtStopEvents]'
})
export class StopEventsDirective extends EventsAttacherBase {
    @Input('rtStopEvents') public eventNames: string[];
    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer, (evt: Event) => {
            evt.stopPropagation();
        });
    }
}
