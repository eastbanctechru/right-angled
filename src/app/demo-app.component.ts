import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {PagedListSampleComponent} from './paged-list-sample/paged-list-sample.component';
import {BufferedListSampleComponent} from './buffered-list-sample/buffered-list-sample.component';
import {RegularListSampleComponent} from './regular-list-sample/regular-list-sample.component';
import {MasterDetailSampleComponent} from './master-detail-sample/master-detail-sample.component';
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
  { component: RegularListSampleComponent, name: 'RegularListSample', path: '/regular-list-sample' },
  { component: MasterDetailSampleComponent, name: 'MasterDetailListSample', path: '/master-detail-sample' }
])
export class DemoAppComponent {

}
