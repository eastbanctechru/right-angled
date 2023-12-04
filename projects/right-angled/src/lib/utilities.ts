/**
 * Copies values of all properties from passed object to the new object literal.
 *
 * If any of the properties of passed object is also a complex object then {@link cloneAsLiteral} will be called recursively.
 *
 * Function declarations are ignored.
 * @param value value to clone.
 * @returns resulted literal.
 */
export function cloneAsLiteral(value: any): any {
  if (value === null) {
    return null;
  }
  if (typeof value === 'undefined') {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map(cloneAsLiteral);
  }
  if (typeof value === 'object') {
    const result: { [id: string]: any } = {};
    for (const index in value) {
      if (Object.prototype.hasOwnProperty.call(value, index) && typeof value[index] !== 'function') {
        result[index] = cloneAsLiteral(value[index]);
      }
    }
    return result;
  }
  return value;
}

/**
 * Set of key-value pairs which is used by {@link coerceValue} method to coerce specific values.
 */
// tslint:disable-next-line: object-literal-key-quotes
export const coerceTypes: any = { true: !0, false: !1, null: null };

/**
 * Coerce type of passed value.
 *
 * For example if you pass string with value 'null' it returns `null`, if you pass 'true' it returns boolean value `true`, if you pass '1.0' it returns number `1.0` etc.
 *
 * If passed value is complex object or array this method will be called for each property or array item.
 * @param value value to coerce.
 * @returns resulted value.
 * @see {@link coerceTypes}
 */
export function coerceValue(value: any): any {
  let result = value;
  if (result === null) {
    return null;
  }
  if (typeof result === 'undefined') {
    return undefined;
  }
  if (typeof result === 'object' || Array.isArray(result)) {
    for (const index in result) {
      if (Object.prototype.hasOwnProperty.call(result, index)) {
        result[index] = coerceValue(result[index]);
      }
    }
  } else if (result && result !== true && !isNaN(result)) {
    result = +result;
  } else if (result === 'undefined') {
    result = undefined;
  } else if (typeof coerceTypes[result] !== 'undefined') {
    result = coerceTypes[result];
  }
  return result;
}
/**
 * Cleaning up passed array by calling `splice` function.
 *
 * Next, each element of passed array will be checked for existence of `destroy` method and if it exists it will be called.
 * @param collection array of elements to destroy.
 * @param async if `true` then iterating over array and `destroy` methods calling will be executed via setTimeout (,0).
 */
export function destroyAll(collection: any[], async = true) {
  if (!Array.isArray(collection)) {
    return;
  }
  let items = collection.splice(0, collection.length);

  if (async) {
    setTimeout(() => {
      items.forEach((item: any) => {
        if (item && item.destroy) {
          item.destroy();
        }
      });
      items = null;
    }, 0);
  } else {
    items.forEach((item: any) => {
      if (item && item.destroy) {
        item.destroy();
      }
    });
  }
}
