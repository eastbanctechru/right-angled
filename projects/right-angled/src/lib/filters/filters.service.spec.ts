// tslint:disable:max-classes-per-file no-unused-expression max-file-line-count
import * as sinon from 'sinon';
import { RTFiltersService } from './filters.service';
import { getDefaultFilterConfig, filter } from './filter.annotation';
import { FilterConfig } from '../core/filter-config';
import { coerceValue, cloneAsLiteral } from '../utilities';

describe('RTFiltersService', () => {
  describe('configs registration', () => {
    it('registers filter config for type', () => {
      class TargetType { }
      const config = getDefaultFilterConfig('propertyName');
      RTFiltersService.registerFilterConfig(TargetType, config);
      expect(RTFiltersService.filterPropertiesMap.has(TargetType)).toBe(true);
      expect(RTFiltersService.filterPropertiesMap.get(TargetType)).toEqual([config]);
    });
    it('registers multiple filter configs for type', () => {
      class TargetType { }
      const config = getDefaultFilterConfig('propertyName');
      const anotherConfig = getDefaultFilterConfig('anotherPropertyName');

      RTFiltersService.registerFilterConfig(TargetType, config);
      RTFiltersService.registerFilterConfig(TargetType, anotherConfig);

      expect(RTFiltersService.filterPropertiesMap.has(TargetType)).toBe(true);
      expect(RTFiltersService.filterPropertiesMap.get(TargetType)).toEqual([config, anotherConfig]);
    });

    it('builds filters map for target properties', () => {
      class TargetType {
        @filter() public first = 'first';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      expect(filtersService.appliedFiltersMap.has(target)).toBe(true);
      expect(filtersService.appliedFiltersMap.get(target).length).toEqual(1);
    });

    it('removes filter target', () => {
      class TargetType {
        @filter() public first = 'first';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      expect(filtersService.appliedFiltersMap.has(target)).toBe(true);
      expect(filtersService.appliedFiltersMap.get(target).length).toEqual(1);

      filtersService.removeFilterTarget(target);
      expect(filtersService.appliedFiltersMap.has(target)).toBe(false);
    });

    it('ignores null on removeFilterTarget', () => {
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(null);

      expect(filtersService.appliedFiltersMap.size).toEqual(0);
      expect(() => filtersService.removeFilterTarget(null)).not.toThrow();
    });

    it('ignores null as target object', () => {
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(null);

      expect(filtersService.appliedFiltersMap.size).toEqual(0);
    });

    it('builds filters map for target object with multiple filters', () => {
      class TargetType {
        @filter() public first = 'first';
        @filter() public second = 'second';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      expect(filtersService.appliedFiltersMap.has(target)).toBe(true);
      expect(filtersService.appliedFiltersMap.get(target).length).toEqual(2);
    });

    it('builds filters map for inheritant objects', () => {
      class TargetTypeParent {
        @filter() public parent = 'parent property';
      }
      class TargetTypeChild extends TargetTypeParent {
        @filter() public child = 'child property';
      }
      const target = new TargetTypeChild();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      expect(filtersService.appliedFiltersMap.has(target)).toBe(true);
      expect(filtersService.appliedFiltersMap.get(target).length).toEqual(2);
      expect(filtersService.appliedFiltersMap.get(target)[0].propertyName).toEqual('parent');
      expect(filtersService.appliedFiltersMap.get(target)[1].propertyName).toEqual('child');
    });

    it('registers several objects in filters map', () => {
      class TargetType {
        @filter() public property = 'property';
      }
      class AnotherTargetType {
        @filter() public anotherProperty = 'another property';
      }
      const target = new TargetType();
      const anotherTarget = new AnotherTargetType();

      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);
      filtersService.registerFilterTarget(anotherTarget);

      expect(filtersService.appliedFiltersMap.has(target)).toBe(true);
      expect(filtersService.appliedFiltersMap.get(target).length).toEqual(1);

      expect(filtersService.appliedFiltersMap.has(anotherTarget)).toBe(true);
      expect(filtersService.appliedFiltersMap.get(anotherTarget).length).toEqual(1);
    });

    it('clones values of properties and saves them as defaults on config registration', () => {
      class TargetType {
        @filter() public property: string[] = ['one', 'two', 'three'];
      }
      class AnotherTargetType {
        @filter() public anotherProperty: string[] = ['four', 'five', 'six'];
      }

      const target = new TargetType();
      const anotherTarget = new AnotherTargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);
      filtersService.registerFilterTarget(anotherTarget);

      expect(filtersService.appliedFiltersMap.get(target)[0].defaultValue).toEqual(target.property);
      expect(filtersService.appliedFiltersMap.get(target)[0].defaultValue).not.toBe(target.property);

      expect(filtersService.appliedFiltersMap.get(anotherTarget)[0].defaultValue).toEqual(anotherTarget.anotherProperty);
      expect(filtersService.appliedFiltersMap.get(target)[0].defaultValue).not.toBe(anotherTarget.anotherProperty);
    });

    it('distincts multiple registrations of same target', () => {
      class TargetType {
        @filter() public first: 'first';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);
      filtersService.registerFilterTarget(target);

      expect(filtersService.appliedFiltersMap.has(target)).toBe(true);
      expect(filtersService.appliedFiltersMap.get(target).length).toEqual(1);
    });

    it('ignores targets without filters', () => {
      class TargetType {
        public first: 'first';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);
      expect(filtersService.appliedFiltersMap.has(target)).toBe(false);
    });

    it('clears targets on destroy', () => {
      class TargetType {
        @filter() public first: 'first';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);
      expect(filtersService.appliedFiltersMap.size).not.toBe(0);

      filtersService.destroy();
      expect(filtersService.appliedFiltersMap.size).toBe(0);
    });
  });
  describe('get...State', () => {
    it('includes all properties to requestState by default', () => {
      class TargetType {
        @filter({ coerce: false } as FilterConfig)
        public first = 'first';
        @filter() public second = 'second';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const requestState = filtersService.getRequestState();
      expect(requestState.first).toEqual(target.first);
      expect(requestState.second).toEqual(target.second);
    });
    it('includes only filtered values to the state if filter is specified', () => {
      class TargetType {
        @filter({ coerce: false } as FilterConfig)
        public first = 'first';
        @filter() public second = 'second';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const filteredState = filtersService.getRequestState((config: FilterConfig) => !config.coerce);
      expect(filteredState.first).toEqual(target.first);
      expect(filteredState.second).toBeUndefined();
    });

    it('calls `toRequest` method of configured filter property if defined', () => {
      class TargetType {
        @filter() public first: any = { toRequest: () => 'first' };
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const requestState = filtersService.getRequestState();
      expect(requestState.first).toEqual(target.first.toRequest());
    });

    it('calls `serializeFormatter` method of config if defined', () => {
      const serializeSpy = sinon.spy(() => 'first');
      class TargetType {
        @filter({ serializeFormatter: serializeSpy } as FilterConfig)
        public first = 'first';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const requestState = filtersService.getRequestState();
      expect(serializeSpy.calledOnce).toBe(true);
      expect(serializeSpy.calledOn(target)).toBe(true);
      expect(serializeSpy.calledWith(target.first)).toBe(true);
      expect(requestState.first).toEqual(serializeSpy());
    });

    it('handles emptyIsNullFlag', () => {
      const cfg = { emptyIsNull: true } as FilterConfig;
      class TargetType {
        @filter(cfg) public zero = 0;

        @filter(cfg) public emptyString = '';

        @filter(cfg) public nullProperty: any = null;

        @filter(cfg) public undefinedProperty: any = undefined;

        @filter(cfg) public falseProperty = false;
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const requestState = filtersService.getRequestState();
      expect(requestState.zero).toBeNull();
      expect(requestState.emptyString).toBeNull();
      expect(requestState.nullProperty).toBeNull();
      expect(requestState.undefinedProperty).toBeNull();
      expect(requestState.falseProperty).toBeNull();
    });
    it('doesn`t add property to result if it`s null or undefined and omitIfNullOrUndefined is `true`', () => {
      class TargetType {
        @filter({ omitIfNullOrUndefined: true } as FilterConfig)
        public normalProperty = 'value';

        @filter({ omitIfNullOrUndefined: true } as FilterConfig)
        public nullProperty: string = null;
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const requestState = filtersService.getRequestState();
      expect(requestState.normalProperty).toEqual(target.normalProperty);
      expect(Object.prototype.hasOwnProperty.call(requestState, 'nullProperty')).toBe(false);
    });
    it('handles arrays', () => {
      class TargetType {
        @filter() public arrayProperty: any[] = [{ toRequest: () => 'first' }, 'first'];
      }

      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const requestState = filtersService.getRequestState();
      expect(requestState.arrayProperty).toEqual(['first', 'first']);
    });
  });
  describe('applyParams', () => {
    it('apply coerced values by default', () => {
      class TargetType {
        @filter() public booleanProperty: any;
        @filter() public nullProperty: any;
        @filter() public numberProperty: number;
        @filter() public stringProperty: string;
        @filter() public undefinedProperty: any;
      }

      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const params = {
        booleanProperty: 'false',
        nullProperty: 'null',
        numberProperty: '5',
        stringProperty: 'value',
        undefinedProperty: 'undefined'
      };
      filtersService.applyParams(params);

      expect(target.booleanProperty).toBe(false);
      expect(target.nullProperty).toBeNull();
      expect(target.numberProperty).toEqual(5);
      expect(target.stringProperty).toBe('value');
      expect(target.undefinedProperty).toBeUndefined();
    });

    it('doesn`t coerce values if specified', () => {
      const cfg = { coerce: false } as FilterConfig;
      class TargetType {
        @filter(cfg) public booleanProperty: any;
        @filter(cfg) public nullProperty: any;
        @filter(cfg) public numberProperty: any;
        @filter(cfg) public stringProperty: any;
        @filter(cfg) public undefinedProperty: any;
      }

      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const params = {
        booleanProperty: 'false',
        nullProperty: 'null',
        numberProperty: '5',
        stringProperty: 'value',
        undefinedProperty: 'undefined'
      };
      filtersService.applyParams(params);

      expect(target.booleanProperty).toEqual('false');
      expect(target.nullProperty).toEqual('null');
      expect(target.numberProperty).toEqual('5');
      expect(target.stringProperty).toEqual('value');
      expect(target.undefinedProperty).toEqual('undefined');
    });

    it('skip mapping of property if `ignoreOnAutoMap` is true', () => {
      class TargetType {
        @filter({ ignoreOnAutoMap: true } as FilterConfig)
        public ignoredProperty: 'old value';
        @filter() public mappedProperty: 'old value';
      }

      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const params = {
        ignoredProperty: 'new value',
        mappedProperty: 'new value'
      };
      filtersService.applyParams(params);

      expect(target.ignoredProperty).not.toEqual(params.ignoredProperty);
      expect(target.mappedProperty).toEqual(params.mappedProperty);
    });

    it('handles emptyIsNullFlag', () => {
      const cfg = { emptyIsNull: true } as FilterConfig;
      class TargetType {
        @filter(cfg) public zero = 0;

        @filter(cfg) public emptyString = '';

        @filter(cfg) public nullProperty: any = null;

        @filter(cfg) public falseProperty = false;
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const params: any = {
        emptyString: '',
        falseProperty: false,
        nullProperty: null,
        zero: 0
      };
      filtersService.applyParams(params);

      expect(target.zero).toBeNull();
      expect(target.emptyString).toBeNull();
      expect(target.nullProperty).toBeNull();
      expect(target.falseProperty).toBeNull();
    });
    it('calls parseFormatter', () => {
      const parseSpy = sinon.spy((value: string) => 'parsed ' + value);

      class TargetType {
        @filter({ parseFormatter: parseSpy } as FilterConfig)
        public value: string;
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const params = {
        value: 'value'
      };
      filtersService.applyParams(params);

      expect(parseSpy.calledOnce).toBe(true);
      expect(parseSpy.calledOn(target)).toBe(true);
      expect(parseSpy.calledWith(params.value, params)).toBe(true);
      expect(target.value).toEqual(parseSpy(params.value));
    });
    it('handles situation when `paramaterName` and `propertyName` are different', () => {
      class TargetType {
        @filter({ parameterName: 'parameter' } as FilterConfig)
        public value: string;
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      const params = {
        parameter: 'parameter value'
      };
      filtersService.applyParams(params);

      expect(target.value).toEqual(params.parameter);
    });
  });
  describe('resetValues', () => {
    it('resets values to defaultValue', () => {
      const cfg = { defaultValue: 'default value' } as FilterConfig;
      class TargetType {
        @filter(cfg) public value = 'string value';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      filtersService.resetValues();

      expect(target.value).toEqual(cfg.defaultValue);
    });
    it('calls defaultValue if it`s function', () => {
      const defaultSpy = sinon.spy(() => 'default value');

      class TargetType {
        @filter({ defaultValue: defaultSpy } as FilterConfig)
        public value = 'string value';
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      filtersService.resetValues();

      expect(defaultSpy.calledOnce).toBe(true);
      expect(defaultSpy.calledOn(target)).toBe(true);
      expect(target.value).toEqual(defaultSpy());
    });

    it('calls parseFormatter on reset', () => {
      const defaultValue = 'value';
      const parseSpy = sinon.spy((value: string) => 'parsed ' + value);

      class TargetType {
        @filter({ parseFormatter: parseSpy } as FilterConfig)
        public value: string = defaultValue;
      }
      const target = new TargetType();
      const filtersService = new RTFiltersService();
      filtersService.registerFilterTarget(target);

      filtersService.resetValues();

      expect(parseSpy.calledOnce).toBe(true);
      expect(parseSpy.calledOn(target)).toBe(true);
      expect(parseSpy.calledWith(defaultValue)).toBe(true);
      expect(target.value).toEqual(parseSpy(defaultValue));
    });
  });
});
