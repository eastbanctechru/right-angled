import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PagedListSampleComponent} from './paged-list-sample/paged-list-sample.component';
import {BufferedListSampleComponent} from './buffered-list-sample/buffered-list-sample.component';
import {SimpleListSampleComponent} from './simple-list-sample/simple-list-sample.component';

@Component({
    directives: [ROUTER_DIRECTIVES], selector: 'angular-app', templateUrl: 'app/app.html'
})
@RouteConfig([
    { component: PagedListSampleComponent, name: 'PagedListSample', path: '/paged-list-sample', useAsDefault: true },
    { component: BufferedListSampleComponent, name: 'BufferedListSample', path: '/buffered-list-sample' },
    { component: SimpleListSampleComponent, name: 'SimpleListSample', path: '/simple-list-sample' }
])
export class App {

}
