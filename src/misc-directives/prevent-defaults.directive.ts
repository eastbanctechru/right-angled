import { Directive, ElementRef, Input } from '@angular/core';

import { EventsAttacherBase } from './events-attacher.base';

@Directive({
    selector: '[rtPreventDefaults]'
})
export class PreventDefaultsDirective extends EventsAttacherBase {
    @Input('rtPreventDefaults') public eventNames: Array<string>;
    constructor(elementRef: ElementRef) {
        super(elementRef, (evt: Event) => { evt.preventDefault(); });
    }
}
