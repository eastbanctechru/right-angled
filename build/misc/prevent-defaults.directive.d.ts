import { ElementRef, Renderer2 } from '@angular/core';
import { EventsAttacherBase } from './events-attacher.base';
export declare class PreventDefaultsDirective extends EventsAttacherBase {
    eventNames: string[];
    constructor(elementRef: ElementRef, renderer: Renderer2);
}
