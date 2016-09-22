import { Directive, ElementRef, Input } from '@angular/core';

import { EventsAttacherBase } from './events-attacher.base';

@Directive({
    selector: '[rtStopEvents]'
})
export class StopEventsDirective extends EventsAttacherBase {
    @Input('rtStopEvents') public eventNames: Array<string>;
    constructor(elementRef: ElementRef) {
        super(elementRef, (evt: Event) => { evt.stopPropagation(); });
    }
}
