import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import 'rxjs/Rx';
import { AirportsService } from './shared';

@Component({
  directives: [ROUTER_DIRECTIVES],
  moduleId: module.id,
  providers: [AirportsService],
  selector: 'rt-demo-app',
  templateUrl: 'demo-app.component.html'
})
export class DemoAppComponent {

}
