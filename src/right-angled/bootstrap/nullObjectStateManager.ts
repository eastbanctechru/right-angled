import { IStateManager } from './IStateManager';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, SkipSelf, Optional } from '@angular/core';

@Injectable()
export class NullObjectStateManager implements IStateManager {
    public static pdr: number = 0;
    private activatedRoute: ActivatedRoute;
    private router: Router;
    public target: any;

    constructor( @Optional() @SkipSelf() activatedRoute: ActivatedRoute, @Optional() @SkipSelf() router: Router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.router.navigate(['/' + this.activatedRoute.snapshot.url[0].path], { queryParams: { 'pdr': NullObjectStateManager.pdr++ } });
    }
    public flushRequestState(state: Object): void { return void (0); }
    public persistLocalState(state: Object): void { return void (0); }
    public mergeStates(params: Object): Object {
        return params;
    }
}
