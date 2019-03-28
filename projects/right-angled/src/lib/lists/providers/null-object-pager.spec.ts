import { ListResponse } from '../../core/list-response';
import { NullObjectPager } from './null-object-pager';

function toResponseObject(): ListResponse<any> {
    return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loadedCount: 20,
        totalCount: 100
    };
}
describe('NullObjectPager', () => {
    it('created with good state', () => {
        const pager = new NullObjectPager();
        expect(pager.totalCount).toEqual(0);
        expect(pager.loadedCount).toEqual(0);
    });

    it('process response values', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        pager.processResponse(response);
        expect(pager.totalCount).toEqual(response.totalCount);
        expect(pager.loadedCount).toEqual(response.loadedCount);
    });
    it('handles array of records as full response', () => {
        const pager = new NullObjectPager();
        const responseArray = [1, 2, 3, 4, 5];
        pager.processResponse(responseArray);
        expect(pager.totalCount).toEqual(responseArray.length);
        expect(pager.loadedCount).toEqual(responseArray.length);
    });

    it('process incorrect totalCount as 0', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        response.totalCount = null;
        pager.processResponse(response);
        expect(pager.totalCount).toEqual(0);
    });
    it('can calculate loadedCount from items array', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        response.loadedCount = null;
        response.totalCount = 20;
        pager.processResponse(response);
        expect(pager.loadedCount).toEqual(response.items.length);
    });

    it('sets loadedCount to 0 if it not specified in response and items array is empty', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        response.loadedCount = null;
        response.items.length = 0;
        pager.processResponse(response);
        expect(pager.loadedCount).toEqual(0);
    });

    it('resets contract properties', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        pager.processResponse(response);
        pager.reset();
        expect(pager.totalCount).toEqual(0);
    });
});
