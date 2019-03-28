import { RTFiltersService } from './filters.service';
import { FilterConfig } from '../core/filter-config';
import { cloneAsLiteral } from '../utilities';

/**
 * Object literal used by {@link getDefaultFilterConfig} function to build filter configuration.
 * This object can be used to change default values of filter configs globally.
 * By default it has next values:
 * ```Javascript
 * {
 *        coerce: true,
 *        defaultValue: undefined,
 *        emptyIsNull: false,
 *        ignoreOnAutoMap: false,
 *        omitIfNullOrUndefined: false,
 *        parameterName: <value of 'propertyName' parameter>,
 *        parseFormatter: undefined,
 *        propertyName: <value of 'propertyName' parameter>,
 *        serializeFormatter: undefined
 * }
 * ```
 */
export let DefaultFilterConfig = {
    coerce: true,
    defaultValue: undefined,
    emptyIsNull: false,
    ignoreOnAutoMap: false,
    omitIfNullOrUndefined: false,
    parseFormatter: undefined,
    serializeFormatter: undefined
} as FilterConfig;

/**
 * Returns filter configuration based on {@link DefaultFilterConfig} values with applied `parameterName` and `propertyName` properties values.
 * @param propertyName name of the property in `target type`, for which configuration is created. This value will be used to set {@link FilterConfig.propertyName} and {@link FilterConfig.parameterName} values.
 * @see {@link FilterConfig}
 */
export function getDefaultFilterConfig(propertyName: string): FilterConfig {
    return {
        parameterName: propertyName,
        propertyName,
        ...cloneAsLiteral(DefaultFilterConfig)
    } as FilterConfig;
}
/**
 * Annotation that can be used to configure type property as filter to use with {@link FiltersService}
 * @param targetOrNameOrConfig
 *  - if annotation is applied without any parameters then result of {@link getDefaultFilterConfig} function will be used. Value of {@link FilterConfig.parameterName} property will be equal to annotated property name.
 *  - if annotation is applied with string parameter then result of {@link getDefaultFilterConfig} function will be used. Value of {@link FilterConfig.parameterName} property will be equal to applied parameter value.
 *  - if annotation is applied with object as parameter then result of {@link getDefaultFilterConfig} will be used and  all properties which were specified in passed object would be applied to resulting configuration via Object.assign.
 * @param key specified by TypeScript automatically.
 * @see {@link FilterConfig}
 */
export function filter(targetOrNameOrConfig?: string | FilterConfig, key?: string): any {
    const decorateWithConfig = (target: object, key2: string): void => {
        const config = getDefaultFilterConfig(key2);
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        } else {
            Object.assign(config, targetOrNameOrConfig);
        }
        RTFiltersService.registerFilterConfig(target.constructor, config);
    };

    if (key) {
        const targetTemp = targetOrNameOrConfig;
        // tslint:disable-next-line:no-parameter-reassignment
        targetOrNameOrConfig = null;
        decorateWithConfig(targetTemp as object, key);
        return;
    }
    return decorateWithConfig;
}
