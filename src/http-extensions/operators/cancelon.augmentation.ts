import { Observable } from 'rxjs/Observable';

import { cancelOn } from './cancelon.extension';
import { CancelOnSignature } from './cancelon.signature';

Observable.prototype.cancelOn = cancelOn;

declare module 'rxjs/Observable' {
    /* tslint:disable:interface-name */
    interface Observable<T> {
        cancelOn: CancelOnSignature;
    }
    /* tslint:enable */
}
