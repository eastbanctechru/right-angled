import { ListResponse } from '../../core/list-response';
import { RTBufferedPager } from './buffered-pager';
import { RTFiltersService } from '../../filters/filters.service';

// tslint:disable:no-unused-expression
function toResponseObject(): ListResponse<any> {
    return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loadedCount: 20,
        totalCount: 100
    };
}
describe('BufferedPager', () => {
    describe('ctor', () => {
        it('created with good state', () => {
            const pager = new RTBufferedPager();
            expect(pager.totalCount).toEqual(0);
            expect(pager.loadedCount).toEqual(0);
            expect(pager.skip).toEqual(0);
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
        });
    });
    describe('response processing', () => {
        it('process response values', () => {
            const pager = new RTBufferedPager();
            const response = toResponseObject();
            pager.processResponse(response);
            expect(pager.totalCount).toEqual(response.totalCount);
            expect(pager.loadedCount).toEqual(response.loadedCount);
            expect(pager.skip).toEqual(response.loadedCount);
        });

        it('handles array of records as full response', () => {
            const pager = new RTBufferedPager();
            const responseArray = [1, 2, 3, 4, 5];
            pager.processResponse(responseArray);
            expect(pager.totalCount).toEqual(responseArray.length);
            expect(pager.loadedCount).toEqual(responseArray.length);
            expect(pager.skip).toEqual(responseArray.length);
        });

        it('increments skip on each load callback execution', () => {
            const pager = new RTBufferedPager();
            const response = toResponseObject();
            for (let i = response.loadedCount; i <= response.totalCount; i += response.loadedCount) {
                pager.processResponse(response);
                expect(pager.skip).toEqual(i);
            }
        });
        it('process incorrect totalCount as 0', () => {
            const pager = new RTBufferedPager();
            const response = toResponseObject();
            response.totalCount = null;
            pager.processResponse(response);
            expect(pager.totalCount).toEqual(0);
        });
        it('can calculate loadedCount and skip properties from items array', () => {
            const pager = new RTBufferedPager();
            const response = toResponseObject();
            response.loadedCount = null;
            response.totalCount = response.items.length * 2;
            pager.processResponse(response);
            expect(pager.loadedCount).toEqual(response.items.length);
            expect(pager.skip).toEqual(response.items.length);
            pager.processResponse(response);
            expect(pager.loadedCount).toEqual(response.items.length * 2);
            expect(pager.skip).toEqual(response.items.length * 2);
        });
        it('sets loadedCount to 0 if it not specified in response and items array is empty', () => {
            const pager = new RTBufferedPager();
            const response = toResponseObject();
            response.loadedCount = null;
            response.items.length = 0;
            pager.processResponse(response);
            expect(pager.loadedCount).toEqual(0);
        });
        it('resets contract properties', () => {
            const pager = new RTBufferedPager();
            const response = toResponseObject();
            pager.processResponse(response);
            pager.reset();
            expect(pager.totalCount).toEqual(0);
            expect(pager.skip).toEqual(0);
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
        });
    });
    describe('as filter target', () => {
        it('parse skip param as 0', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
            expect(pager.skip).toEqual(0);
            const params = {
                skip: 100,
                take: 100
            };
            filtersService.applyParams(params);
            expect(pager.skip).toEqual(0);
        });
        it('parse takeRowCount as sum of skip and take if both specified', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
            expect(pager.skip).toEqual(0);
            const params = {
                skip: 100,
                take: 100
            };
            filtersService.applyParams(params);
            expect(pager.takeRowCount).toEqual(params.skip + params.take);
        });
        it('parse takeRowCount as defaultRowCount if skip or take not specified', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            const params = {
                take: 100
            };
            filtersService.applyParams(params);
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
        });
        it('parse nulls as zeroes for takeRowCount', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            filtersService.applyParams({
                skip: 100,
                take: null
            });
            expect(pager.takeRowCount).toEqual(100);
            filtersService.applyParams({
                skip: null,
                take: 100
            });
            expect(pager.takeRowCount).toEqual(100);
        });
        it('parse takeRowCount to defaultRowCount if parsed value is invalid', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            filtersService.applyParams({
                skip: null,
                take: null
            });
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
        });
        it('sets takeRowCount to defaultRowCount on reset', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            pager.takeRowCount = 40;
            expect(pager.takeRowCount).toEqual(40);
            filtersService.resetValues();
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
        });

        it('can have own defaultRowCount', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            pager.defaultRowCount = 5;
            filtersService.resetValues();
            expect(pager.takeRowCount).toEqual(5);
            expect(RTBufferedPager.settings.defaultRowCount).not.toEqual(pager.defaultRowCount);
        });

        it('skips validation on rowCount reset', () => {
            const pager = new RTBufferedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            pager.totalCount = 1;
            pager.takeRowCount = pager.defaultRowCount;
            expect(pager.takeRowCount).not.toEqual(pager.defaultRowCount);
            expect(pager.takeRowCount).toEqual(pager.totalCount);
            filtersService.resetValues();
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
        });
    });
    describe('pager state', () => {
        it('sets rowCount to maxRowCount when try to set bigger value', () => {
            const pager = new RTBufferedPager();
            pager.takeRowCount = RTBufferedPager.settings.maxRowCount + 100;
            expect(pager.takeRowCount).toEqual(RTBufferedPager.settings.maxRowCount);
        });

        it('can have own maxRowCount', () => {
            const pager = new RTBufferedPager();
            pager.maxRowCount = RTBufferedPager.settings.maxRowCount + 100;
            pager.takeRowCount = pager.maxRowCount + 100;
            expect(pager.takeRowCount).toEqual(pager.maxRowCount);
            expect(pager.maxRowCount).not.toEqual(RTBufferedPager.settings.maxRowCount);
        });

        it('sets rowCount to defaultRowCount when try to set less then minRowCount', () => {
            const pager = new RTBufferedPager();
            pager.takeRowCount = RTBufferedPager.settings.minRowCount - 1;
            expect(pager.takeRowCount).toEqual(RTBufferedPager.settings.defaultRowCount);
        });

        it('can have own minRowCount', () => {
            const pager = new RTBufferedPager();
            pager.minRowCount = RTBufferedPager.settings.minRowCount + 10;
            pager.takeRowCount = pager.minRowCount - 1;
            expect(pager.takeRowCount).toEqual(pager.defaultRowCount);
            expect(pager.minRowCount).not.toEqual(RTBufferedPager.settings.minRowCount);
        });

        it('sets takeRowCount to unloaded records count when totalCount specified and setted value is bigger', () => {
            const pager = new RTBufferedPager();
            pager.processResponse(toResponseObject());
            pager.takeRowCount = pager.totalCount;
            expect(pager.takeRowCount).toEqual(pager.totalCount - pager.skip);
        });

        it('sets takeRowCount when totalCount specified and setted value is not bigger', () => {
            const pager = new RTBufferedPager();
            pager.processResponse(toResponseObject());
            pager.takeRowCount = pager.totalCount - pager.skip - 10;
            expect(pager.takeRowCount).toEqual(pager.totalCount - pager.skip - 10);
        });
        it('canLoadMore is true if not all records loaded', () => {
            const pager = new RTBufferedPager();
            pager.processResponse(toResponseObject());
            expect(pager.canLoadMore).toBeTruthy();
        });
        it('canLoadMore is false if totalCount is 0', () => {
            const pager = new RTBufferedPager();
            expect(pager.totalCount).toEqual(0);
            expect(pager.canLoadMore).toBeFalsy();
        });
        it('canLoadMore is false if all records loaded', () => {
            const pager = new RTBufferedPager();
            pager.processResponse(toResponseObject());
            pager.skip = pager.totalCount;
            expect(pager.canLoadMore).toBeFalsy();
        });
        it('canLoadMore is true for flat responses while full chunk of data loaded', () => {
            const pager = new RTBufferedPager();
            pager.takeRowCount = 5;
            pager.processResponse([1, 2, 3, 4, 5]);
            expect(pager.canLoadMore).toBeTruthy();
            pager.processResponse([6, 7, 8]);
            expect(pager.canLoadMore).toBeFalsy();
        });
    });
});
