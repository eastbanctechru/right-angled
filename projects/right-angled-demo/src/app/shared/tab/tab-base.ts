import { BehaviorSubject } from 'rxjs';

export abstract class Tab {
    public tabTitle = '';
    public isActive$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public activate(): void {
        this.isActive$.next(true);
    }
    public deactivate(): void {
        this.isActive$.next(false);
    }
}
