import { Directive, ElementRef, Input } from '@angular/core';

import { EventsAttacherBase } from './events-attacher.base';

@Directive({
    selector: '[rtStopEvents]'
})
export class StopEventsDirective extends EventsAttacherBase {
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtStopEvents') public eventNames: string[];
    constructor(elementRef: ElementRef) {
        super(elementRef, (evt: Event) => { evt.stopPropagation(); });
    }
}
