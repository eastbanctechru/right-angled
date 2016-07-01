import { Injectable } from '@angular/core';
import { NgListServiceBase } from './ngListServiceBase';
import { SimplePager } from 'e2e4';
import { QueryStringStateManager } from './queryStringStateManager';
@Injectable()
export class NgListService extends NgListServiceBase {
    public pager: SimplePager;
    constructor(stateManager: QueryStringStateManager) {
        super(new SimplePager(), stateManager);
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
