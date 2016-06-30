import { Injectable } from '@angular/core';
import { NgListServiceBase } from './ngListServiceBase';
import { BufferedPager } from 'e2e4';
import { NullObjectStateManager } from './nullObjectStateManager';
@Injectable()
export class NgBufferedListService extends NgListServiceBase {
    public pager: BufferedPager;
    constructor(stateManager: NullObjectStateManager) {
        super(new BufferedPager(), stateManager);
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgBufferedListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
