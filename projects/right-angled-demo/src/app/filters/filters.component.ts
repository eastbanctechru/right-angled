import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'filters.component.html',
    standalone: false
})
export class FiltersComponent {}
