import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'persistence.component.html',
    standalone: false
})
export class PersistenceComponent {}
