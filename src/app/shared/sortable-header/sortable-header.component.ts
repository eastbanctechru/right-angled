import { Component } from '@angular/core';
import {RECTANGLE_DIRECTIVES} from '../../../right-angled/index';
@Component({
  moduleId: module.id,
  selector: 'thead[sortable-header]',
  directives: [RECTANGLE_DIRECTIVES],
  templateUrl: 'sortable-header.component.html'
})
export class SortableHeaderComponent {
}
