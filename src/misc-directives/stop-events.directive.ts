import { Directive, ElementRef, Input, Renderer } from '@angular/core';

import { EventsAttacherBase } from './events-attacher.base';

@Directive({
    selector: '[rtStopEvents]'
})
export class StopEventsDirective extends EventsAttacherBase {
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtStopEvents') public eventNames: string[];
    constructor(elementRef: ElementRef, renderer: Renderer) {
        super(elementRef, renderer, (evt: Event) => { evt.stopPropagation(); });
    }
}
