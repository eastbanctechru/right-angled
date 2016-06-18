import { Observable } from 'rxjs/Observable';
import { CancelOnOperator } from './cancelon.operator';

export function cancelOn<T>(event: Observable<any>): Observable<T> {
    return this.lift(new CancelOnOperator(event));
}
