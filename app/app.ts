import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {PagedListSample} from './paged-list-sample/paged-list-sample';
import {BufferedListSample} from './buffered-list-sample/buffered-list-sample';
import {SimpleListSample} from './simple-list-sample/simple-list-sample';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';


@Component({
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
    selector: 'angular-app',
    templateUrl: 'app/app.html'
})
@RouteConfig([
    { component: PagedListSample, name: 'PagedListSample', path: '/paged-list-sample', useAsDefault: true },
    { component: BufferedListSample, name: 'BufferedListSample', path: '/buffered-list-sample' },
    { component: SimpleListSample, name: 'SimpleListSample', path: '/simple-list-sample' }
])
export class App {

}
