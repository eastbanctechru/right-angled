import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rt-demo-app',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class DemoAppComponent {

}
