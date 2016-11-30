import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

import { EventsAttacherBase } from './events-attacher.base';

@Directive({
    selector: '[rtPreventDefaults]'
})
export class PreventDefaultsDirective extends EventsAttacherBase implements OnChanges, OnDestroy {
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtPreventDefaults') public eventNames: string[];
    constructor(elementRef: ElementRef) {
        super(elementRef, (evt: Event) => { evt.preventDefault(); });
    }
    public ngOnChanges(changes: { eventNames?: SimpleChange }): void {
        super.ngOnChanges(changes);
    }
    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
