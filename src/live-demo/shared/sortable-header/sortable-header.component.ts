import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  encapsulation: ViewEncapsulation.None,
  moduleId: module.id,
  // tslint:disable-next-line: component-selector-name component-selector-type component-selector-prefix
  selector: 'thead[rt-demo-sortable-header]',
  styleUrls: ['sortable-header.component.css'],
  templateUrl: 'sortable-header.component.html'
})
export class SortableHeaderComponent {
}
