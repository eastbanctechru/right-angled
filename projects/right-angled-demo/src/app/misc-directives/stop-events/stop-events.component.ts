import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AlertifyService } from '../../shared/alertify/alertify.service';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-stop-events',
    templateUrl: 'stop-events.component.html',
    standalone: false
})
export class StopEventsComponent {
    public stopPropagation = true;
    private alertify = inject(AlertifyService);
    public logKeyPress(eventKey: string): void {
        this.alertify.alert(`'${eventKey}' pressed`);
    }
}
