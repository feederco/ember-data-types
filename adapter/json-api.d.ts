import RESTAdapter from './rest';

/**
 * These types are not officially part of ember-data, but based on the
 * source code these types are used a lot, so we export them for convenience
 */


export type JSONAPIErrorSource = {
  pointer: string;
}

export type JSONAPIError = {
  title?: string;
  detail: string;
  source?: JSONAPIErrorSource[] | JSONAPIErrorSource
}

/**
 * The `JSONAPIAdapter` is the default adapter used by Ember Data. It
 * is responsible for transforming the store's requests into HTTP
 * requests that follow the [JSON API](http://jsonapi.org/format/)
 * format.
 */
declare class JSONAPIAdapter extends RESTAdapter {}

export default JSONAPIAdapter;
