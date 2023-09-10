import EmberError from '@ember/error';
import { service } from '@ember/service';
import Ember from 'ember';
import { assertType } from './lib/assert';
import AdapterError, { AbortError, ConflictError, ForbiddenError, InvalidError, NotFoundError, ServerError, TimeoutError, UnauthorizedError } from 'ember-data/adapter/errors';

// assert AdapterError extends EmberError
assertType<EmberError>(new AdapterError('Error'));

// https://emberjs.com/api/ember-data/2.16/classes/AdapterError
class MaintenanceError extends AdapterError {
    message = 'Down for maintenance.';
}

const maintenanceError = new MaintenanceError();
assertType<AdapterError>(maintenanceError);

// https://emberjs.com/api/ember-data/2.16/classes/InvalidError
const anInvalidError = new InvalidError([
    {
        detail: 'Must be unique',
        source: { pointer: '/data/attributes/title' },
    },
    {
        detail: 'Must not be blank',
        source: { pointer: '/data/attributes/content' },
    },
]);

// https://emberjs.com/api/ember-data/2.16/classes/TimeoutError
const timedOut = Ember.Route.extend({
    actions: {
        error(error: any, transition: any) {
            if (error instanceof TimeoutError) {
                // alert the user
                alert('Are you still connected to the internet?');
                return;
            }

            // ...other error handling logic
        },
    },
});

// This is technically private, but publicly exposed for APIs to use. We just
// check that it is a proper subclass of `AdapterError`.
// https://emberjs.com/api/ember-data/2.16/classes/AbortError
// https://github.com/emberjs/data/blob/v2.16.0/addon/-private/adapters/errors.js#L206-L216
assertType<typeof AdapterError>(AbortError);

// https://emberjs.com/api/ember-data/2.16/classes/UnauthorizedError
assertType<typeof AdapterError>(UnauthorizedError);

declare class Route {};

class Unauthorized extends Route {
    error(error: any, transition: any) {
        if (error instanceof UnauthorizedError) {
            // go to the sign in route
            return;
        }

        // ...other error handling logic
    }
}

// This is technically private, but publicly exposed for APIs to use. We just
// check that it is a proper subclass of `AdapterError`.
// https://emberjs.com/api/ember-data/2.16/classes/ForbiddenError
// https://github.com/emberjs/data/blob/v2.16.0/addon/-private/adapters/errors.js#L253-L263
assertType<typeof AdapterError>(ForbiddenError);

// https://emberjs.com/api/ember-data/2.16/classes/NotFoundError
assertType<typeof AdapterError>(NotFoundError);
const notFound = Ember.Route.extend({
    store: service('store'),

    model(params: { post_id: string }): any {
        return this.get('store').findRecord('post', params.post_id);
    },

    actions: {
        error(error: any, transition: any): any {
            if (error instanceof NotFoundError) {
                // redirect to a list of all posts instead
                this.transitionTo('posts');
            } else {
                // otherwise let the error bubble
                return true;
            }
        },
    },
});

// This is technically private, but publicly exposed for APIs to use. We just
// check that it is a proper subclass of `AdapterError`.
// https://emberjs.com/api/ember-data/2.16/classes/ConflictError
// https://github.com/emberjs/data/blob/v2.16.0/addon/-private/adapters/errors.js#L303-L313
assertType<typeof AdapterError>(ConflictError);

// This is technically private, but publicly exposed for APIs to use. We just
// check that it is a proper subclass of `AdapterError`.
// https://emberjs.com/api/ember-data/2.16/classes/ServerError
// https://github.com/emberjs/data/blob/v2.16.0/addon/-private/adapters/errors.js#L315-L323
assertType<typeof AdapterError>(ServerError);
