import { RowNumberPipe } from '../../index';

describe('RowNumberPipe', () => {
    const listStub: any = {
        listService: {
            pager: {}
        }
    };
    const pipe = new RowNumberPipe();
    it("Returns index + displayFrom if 'displayFrom' property specified", () => {
        // tslint:disable-next-line:no-object-literal-type-assertion
        expect(
            pipe.transform(0, {
                listService: {
                    pager: {
                        displayFrom: 10
                    }
                }
            } as any)
        ).toBe(10);
    });
    it("Returns index + 1 if 'displayFrom' property not specified", () => {
        expect(pipe.transform(0, listStub)).toBe(1);
    });
    it('Throws error if rtListDirective is not specified', () => {
        expect(() => pipe.transform(0, null)).toThrowError(
            'Invalid value provided for parameter "rtList" of rtRowNumber pipe . Must be "rtList" directive instance.'
        );
    });
    it('Throws error if index parameter is not numeric', () => {
        expect(() => pipe.transform(null, listStub)).toThrowError(
            'Invalid input value for rtRowNumber pipe. Must be a valid numeric value.'
        );
        expect(() => pipe.transform('abc' as any, listStub)).toThrowError(
            'Invalid input value for rtRowNumber pipe. Must be a valid numeric value.'
        );
    });
});
