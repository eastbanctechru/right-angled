import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import 'rxjs/Rx';
import { AirportsService } from '../shared';

@Component({
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  moduleId: module.id,
  providers: [AirportsService],
  selector: 'rt-demo-app',
  styleUrls: ['demo-app.component.css'],
  templateUrl: 'demo-app.component.html'
})
export class DemoAppComponent {

}
