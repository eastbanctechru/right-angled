import { HostListener, SkipSelf, Directive, Input } from '@angular/core';

import { SelectionAreaForDirective } from './selection-area-for.directive';

@Directive({
    selector: 'input[rtCheckAll]'
})
export class CheckAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionArea: SelectionAreaForDirective) {
    }

    @HostListener('change', ['$event'])
    public changeHandler(evt: MouseEvent): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionArea.selectionService.selectAll();
            // run this directly after render to give child selectionAreas ability to render
            setTimeout(() => {
                if (this.recursive && this.selectionArea.childSelectionAreas) {
                    this.selectionArea.childSelectionAreas.toArray().forEach(area => {
                        if (this.selectionArea !== area) {
                            area.selectionService.selectAll();
                        }
                    });
                }
            }, 0);

        } else {
            if (this.recursive && this.selectionArea.childSelectionAreas) {
                this.selectionArea.childSelectionAreas.toArray().forEach(area => {
                    if (this.selectionArea !== area) {
                        area.selectionService.deselectAll();
                    }
                });
            }
            this.selectionArea.selectionService.deselectAll();
        }
    }
}
