import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

import { EventsAttacherBase } from './events-attacher.base';

@Directive({
    selector: '[rtStopEvents]'
})
export class StopEventsDirective extends EventsAttacherBase implements OnChanges, OnDestroy {
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtStopEvents') public eventNames: Array<string>;
    constructor(elementRef: ElementRef) {
        super(elementRef, (evt: Event) => { evt.stopPropagation(); });
    }
    public ngOnChanges(changes: { eventNames?: SimpleChange }): void {
        super.ngOnChanges(changes);
    }
    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
