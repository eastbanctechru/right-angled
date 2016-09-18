import { Component, ViewEncapsulation } from '@angular/core';
import 'rxjs/Rx';

import { AirportsService } from '../shared';

@Component({
  encapsulation: ViewEncapsulation.None,
  providers: [AirportsService],
  selector: 'rt-demo-app',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class DemoAppComponent {
}
