import { AfterContentInit, Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/Rx';

import { AirportsService } from '../shared';

// google code-prettify
declare const PR: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  moduleId: module.id,
  providers: [AirportsService],
  selector: 'rt-demo-app',
  styleUrls: ['demo-app.component.css'],
  templateUrl: 'demo-app.component.html'
})
export class DemoAppComponent implements AfterContentInit {
  constructor(private router: Router) {

  }
  public ngAfterContentInit(): any {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (typeof PR !== 'undefined') {
          // google code-prettify
          setTimeout(PR.prettyPrint, 50);
        }
      }
    });
  }
}
