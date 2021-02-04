import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { EventsAttacherBaseDirective } from './events-attacher.base';

@Directive({
    selector: '[rtPreventDefaults]'
})
export class PreventDefaultsDirective extends EventsAttacherBaseDirective {
    @Input('rtPreventDefaults') public eventNames: string[];
    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer, (evt: Event) => {
            evt.preventDefault();
        });
    }
}
