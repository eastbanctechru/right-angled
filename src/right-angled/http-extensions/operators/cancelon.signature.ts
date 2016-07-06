import { Observable } from 'rxjs/Observable';

export interface CancelOnSignature {
    <T>(event: Observable<any>): Observable<T>;
}
