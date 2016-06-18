import { Observable } from 'rxjs/Observable';

export interface ICancelOnSignature {
    <T>(event: Observable<any>): Observable<T>;
}
