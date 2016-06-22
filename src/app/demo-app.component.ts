import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {PagedListSampleComponent} from './paged-list-sample/paged-list-sample.component';
import {BufferedListSampleComponent} from './buffered-list-sample/buffered-list-sample.component';
import {SimpleListSampleComponent} from './simple-list-sample/simple-list-sample.component';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
  selector: 'rt-demo-app',
  templateUrl: 'demo-app.component.html'
})
@RouteConfig([
  { component: PagedListSampleComponent, name: 'PagedListSample', path: '/paged-list-sample', useAsDefault: true },
  { component: BufferedListSampleComponent, name: 'BufferedListSample', path: '/buffered-list-sample' },
  { component: SimpleListSampleComponent, name: 'SimpleListSample', path: '/simple-list-sample' }
])
export class DemoAppComponent {

}
