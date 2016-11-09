import { RowNumberPipe } from '../../src/list-directives';

describe('RowNumberPipe', () => {
    let listStub: any = {
        listService: {
            pager: {
            }
        }
    };
    let pipe = new RowNumberPipe();
    it('Returns index + displayFrom if \'displayFrom\' property specified', () => {
        expect(pipe.transform(0, <any>{
            listService: {
                pager: {
                    displayFrom: 10
                }
            }
        })).toBe(10);
    });
    it('Returns index + 1 if \'displayFrom\' property not specified', () => {
        expect(pipe.transform(0, listStub)).toBe(1);
    });
    it('Throws error if rtListDirective is not specified', () => {
        expect(() => pipe.transform(0, null)).toThrowError('Invalid value provided for parameter "rtList" of rtRowNumber pipe . Must be "rtList" directive instance.');
    });
    it('Throws error if index parameter is not numeric', () => {
        expect(() => pipe.transform(null, listStub)).toThrowError('Invalid input value for rtRowNumber pipe. Must be a valid numeric value.');
        expect(() => pipe.transform(<any>'abc', listStub)).toThrowError('Invalid input value for rtRowNumber pipe. Must be a valid numeric value.');
    });
});
