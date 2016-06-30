import { Component } from '@angular/core';
import { RECTANGLE_DIRECTIVES } from '../../../right-angled/index';
@Component({
  directives: [RECTANGLE_DIRECTIVES],
  moduleId: module.id,
  /* tslint:disable-next-line:component-selector-prefix component-selector-name component-selector-type */
  selector: 'thead[sortable-header]',
  templateUrl: 'sortable-header.component.html'
})
export class SortableHeaderComponent {
}
