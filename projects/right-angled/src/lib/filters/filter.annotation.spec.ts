import { FilterConfig } from '../core/filter-config';
import { getDefaultFilterConfig, DefaultFilterConfig, filter } from './filter.annotation';
import { RTFiltersService } from './filters.service';

// tslint:disable:max-classes-per-file no-unused-expression
function parseStub(value: object): object {
    return value;
}
function serializeStub(rawValue: object): object {
    return rawValue;
}

describe('getDefaultFilterConfig', () => {
    it('builds config based on DefaultFilterConfig with applied propertyName', () => {
        const actualConfig = getDefaultFilterConfig('requestProperty');

        const expectedConfig = {
            coerce: DefaultFilterConfig.coerce,
            defaultValue: DefaultFilterConfig.defaultValue,
            emptyIsNull: DefaultFilterConfig.emptyIsNull,
            ignoreOnAutoMap: DefaultFilterConfig.ignoreOnAutoMap,
            omitIfNullOrUndefined: DefaultFilterConfig.omitIfNullOrUndefined,
            parameterName: 'requestProperty',
            parseFormatter: DefaultFilterConfig.parseFormatter,
            propertyName: 'requestProperty',
            serializeFormatter: DefaultFilterConfig.serializeFormatter
        } as FilterConfig;

        expect(actualConfig).toEqual(expectedConfig);
    });
    it('when DefaultFilterConfig properties are changed it builds config with corresponding value', () => {
        let config = getDefaultFilterConfig('requestProperty');
        expect(config.coerce).toEqual(DefaultFilterConfig.coerce);

        DefaultFilterConfig.coerce = !DefaultFilterConfig.coerce;
        config = getDefaultFilterConfig('requestProperty');
        expect(config.coerce).toEqual(DefaultFilterConfig.coerce);

        DefaultFilterConfig.coerce = !DefaultFilterConfig.coerce;
        config = getDefaultFilterConfig('requestProperty');
        expect(config.coerce).toEqual(DefaultFilterConfig.coerce);
    });
});
describe('filterAnnotation', () => {
    it('registers config in filtersService', () => {
        class RequestObject {
            @filter() public requestProperty: string;
        }
        expect(RTFiltersService.filterPropertiesMap.has(RequestObject)).toBe(true);
        expect(RTFiltersService.filterPropertiesMap.get(RequestObject).length).toEqual(1);
    });
    it('registers property with default config if its annotated without args', () => {
        class RequestObject {
            @filter() public requestProperty: string;
        }
        const actualConfig = RTFiltersService.filterPropertiesMap.get(RequestObject)[0];
        const expectedConfig = getDefaultFilterConfig('requestProperty');
        expect(actualConfig).toEqual(expectedConfig);
    });

    it('registers default config with custom parameter name when gets string param', () => {
        class RequestObject {
            @filter('changedName') public requestProperty: string;
        }
        const actualConfig = RTFiltersService.filterPropertiesMap.get(RequestObject)[0];
        const expectedConfig = getDefaultFilterConfig('requestProperty');
        expectedConfig.parameterName = 'changedName';
        expect(actualConfig).toEqual(expectedConfig);
    });
    it('registers custom config with object parameter', () => {
        class RequestObject {
            @filter({
                coerce: false,
                defaultValue: 1,
                emptyIsNull: true,
                ignoreOnAutoMap: true,
                parameterName: 'customName',
                parseFormatter: parseStub,
                propertyName: 'customName',
                serializeFormatter: serializeStub
            } as FilterConfig)
            public requestProperty: string;
        }

        const actualConfig = RTFiltersService.filterPropertiesMap.get(RequestObject)[0];
        const expectedConfig = {
            coerce: false,
            defaultValue: 1,
            emptyIsNull: true,
            ignoreOnAutoMap: true,
            omitIfNullOrUndefined: false,
            parameterName: 'customName',
            parseFormatter: parseStub,
            propertyName: 'customName',
            serializeFormatter: serializeStub
        };
        expect(actualConfig).toEqual(expectedConfig);
    });
    it('all of the config defaults can be overriden', () => {
        const defaultConfig = getDefaultFilterConfig('propertyName');
        const config: FilterConfig = {
            coerce: !defaultConfig.coerce,
            defaultValue: 'defaultValue',
            emptyIsNull: !defaultConfig.emptyIsNull,
            ignoreOnAutoMap: !defaultConfig.ignoreOnAutoMap,
            omitIfNullOrUndefined: !defaultConfig.omitIfNullOrUndefined,
            parameterName: 'parameterName',
            parseFormatter: (proposedValue: any) => proposedValue,
            propertyName: 'propertyName',
            serializeFormatter: () => ''
        };
        class RequestObject {
            @filter(config) public requestProperty: string;
        }

        const actualConfig = RTFiltersService.filterPropertiesMap.get(RequestObject)[0];
        expect(config).toEqual(actualConfig);
    });
});
