import { CancelOnOperator } from './cancelon.operator';

import { Observable } from 'rxjs/Observable';

export function cancelOn<T>(event: Observable<any>): Observable<T> {
    return this.lift(new CancelOnOperator(event));
}
