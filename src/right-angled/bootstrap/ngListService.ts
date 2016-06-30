import { Injectable } from '@angular/core';
import { NgListServiceBase } from './ngListServiceBase';
import { SimplePager } from 'e2e4';
import { NullObjectStateManager } from './nullObjectStateManager';
@Injectable()
export class NgListService extends NgListServiceBase {
    public pager: SimplePager;
    constructor(stateManager: NullObjectStateManager) {
        super(new SimplePager(), stateManager);
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
