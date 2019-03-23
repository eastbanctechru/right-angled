// tslint:disable:max-classes-per-file no-unused-expression
import { destroyAll, cloneAsLiteral, coerceValue } from './utilities';

class Destroyable {
    public destroyed = false;
    public destroy() {
        this.destroyed = true;
    }
}

describe('Utilities', () => {
    describe('destroyAll', () => {
        it('destroyAll sync calls `destroy` method of elements if it exists', () => {
            const destroyable = new Destroyable();
            destroyAll([destroyable], false);
            expect(destroyable.destroyed).toEqual(true);
        });

        it('destroyAll async calls `destroy` method of elements if it exists', (done: () => void) => {
            const destroyable = new Destroyable();
            destroyAll([destroyable]);
            setTimeout(() => {
                expect(destroyable.destroyed).toEqual(true);
                done();
            }, 0);
        });

        it('doesn`t break on invalid collections sync', () => {
            const callFn = (): void => {
                destroyAll(null, false);
            };
            expect(callFn).not.toThrow();
        });

        it('doesn`t break on invalid collections async', () => {
            const callFn = (): void => {
                destroyAll(null);
            };
            expect(callFn).not.toThrow();
        });

        it('doesn`t break on invalid collection elements sync', () => {
            const callFn = (): void => {
                destroyAll([undefined, null], false);
            };
            expect(callFn).not.toThrow();
        });

        it('doesn`t break on invalid collection elements async', () => {
            const callFn = (): void => {
                destroyAll([undefined, null]);
            };
            expect(callFn).not.toThrow();
        });

        it('ignore items without destroy sync', () => {
            const collection = [{ id: 1 }];
            destroyAll(collection, false);
            expect(collection.length).toEqual(0);
        });

        it('ignore items without destroy async', (done: () => void) => {
            const collection = [{ id: 1 }];

            destroyAll(collection);
            setTimeout(() => {
                expect(collection.length).toEqual(0);
                done();
            }, 0);
        });
    });
    describe('cloneLiteral', () => {
        it('clones simple values', () => {
            expect(cloneAsLiteral(5)).toEqual(5);
            expect(cloneAsLiteral('Hello world')).toEqual('Hello world');
            expect(cloneAsLiteral(null)).toBeNull();
            expect(cloneAsLiteral(undefined)).toBeUndefined();
        });

        it('clones arrays', () => {
            const toClone = ['Hello world', 5, null];
            const cloned = cloneAsLiteral(toClone);
            expect(cloned).toEqual(toClone);
            expect(cloned).not.toBe(toClone);
        });

        it('clones object literals', () => {
            const toClone: any = {
                arrayProperty: ['Hello world', 5, null],
                literalProperty: {
                    innerArrayProperty: ['Hello world', 5, null],
                    innerNullProperty: null,
                    innerNumberProperty: 5,
                    innerStringProperty: 'Hello world'
                },
                nullProperty: null,
                numberProperty: 5,
                stringProperty: 'Hello world'
            };
            const cloned = cloneAsLiteral(toClone);
            expect(cloned).not.toBe(toClone);
            expect(cloned).toEqual(toClone);
        });
        it('clones only properties', () => {
            const toClone = {
                arrayProperty: ['Hello world', 5, null],
                functionProperty(): void {
                    return;
                }
            };
            const cloned = cloneAsLiteral(toClone);
            expect(cloned).not.toBe(toClone);
            expect(cloned).not.toEqual(toClone);
            expect(cloned.functionProperty).toBeUndefined();
        });
    });
    describe('coerceValue', () => {
        it('doesn`t modify regular string', () => {
            expect(coerceValue('just a string')).toEqual('just a string');
        });
        it('doesn`t parse NaN string to number', () => {
            expect(coerceValue('5.5tst')).not.toEqual(5.5);
        });
        it('parse number strings to numbers', () => {
            expect(coerceValue('5')).toEqual(5);
            expect(coerceValue('5.5')).toEqual(5.5);
            expect(coerceValue('0.5')).toEqual(0.5);
        });
        it('handles null and undefined', () => {
            expect(coerceValue(null)).toBeNull();
            expect(coerceValue(undefined)).toBeUndefined();
        });
        it('parse `undefined` to undefined', () => {
            expect(coerceValue('undefined')).toEqual(undefined);
        });
        it('parse `null` to null', () => {
            expect(coerceValue('null')).toEqual(null);
        });
        it('parse `false` to false', () => {
            expect(coerceValue('false')).toEqual(false);
        });
        it('parse `true` to true', () => {
            expect(coerceValue('true')).toEqual(true);
        });
        it('doesn`t parse `False` as boolean', () => {
            expect(coerceValue('False')).not.toEqual(false);
        });
        it('doesn`t parse `True` as boolean', () => {
            expect(coerceValue('True')).not.toEqual(true);
        });
        it('supports complex objects', () => {
            expect(
                coerceValue({
                    a: 'true',
                    b: 'false',
                    c: 'null',
                    d: 'undefined',
                    e: '5',
                    f: 'just a string'
                })
            ).toEqual({
                a: true,
                b: false,
                c: null,
                d: undefined,
                e: 5,
                f: 'just a string'
            });
        });
        it('supports arrays', () => {
            expect(coerceValue(['true', 'false', 'null', 'undefined', '5', 'just a string'])).toEqual([true, false, null, undefined, 5, 'just a string']);
        });
        it('works only with own properties', () => {
            class ParentRequest {
                public parentProperty = 'just a string';
                public parentMethod(): void {
                    return;
                }
            }
            class ChildRequest extends ParentRequest {
                public childProperty = 'just a string';
            }
            expect(coerceValue(new ChildRequest()).hasOwnProperty('parentMethod')).toBeFalsy();
        });
    });
});
