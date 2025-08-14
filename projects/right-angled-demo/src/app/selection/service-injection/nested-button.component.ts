import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RTSelectionService } from 'right-angled';
import { AlertifyService } from '../../shared/alertify/alertify.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-nested-button',
    template: `
        <button class="btn btn-primary" title="Get selected items" (click)="displaySelectedItems()">
            Get selected items
        </button>
    `,
    standalone: false
})
export class NestedButtonComponent {
    constructor(public selectionService: RTSelectionService) { }
    private alertify = inject(AlertifyService);
    public displaySelectedItems(): void {
        this.alertify.alert(
            this.selectionService
                .getSelectedElements()
                .map((c: any) => c.name)
                .join(';')
        );
    }
}
