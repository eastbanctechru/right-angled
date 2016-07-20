import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import 'rxjs/Rx';
import { AirportsService } from './shared';

@Component({
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
  moduleId: module.id,
  providers: [AirportsService],
  selector: 'rt-demo-app',
  templateUrl: 'demo-app.component.html'
})
export class DemoAppComponent {

}
