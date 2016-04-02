import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BaseListSample} from './base-list-sample/baseListSample';

@Component({
    directives: [ROUTER_DIRECTIVES], selector: 'angular-app', templateUrl: 'app/app.html'
})
@RouteConfig([
    { component: BaseListSample, name: 'BaseListSample', path: '/base-list-sample', useAsDefault: true }
])
export class App {
    message: string = 'Welcome to Angular2!';
}
