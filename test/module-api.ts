/**
 * Tests for the legacy DS namespace
 */
import DS from 'ember-data';

import { assertType } from './lib/assert';
import Adapter from '@ember-data/adapter';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import RESTAdapter from '@ember-data/adapter/rest';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Serializer from '@ember-data/serializer';
import JSONSerializer from '@ember-data/serializer/json';
import RESTSerializer from '@ember-data/serializer/rest';
import JSONAPISerializer from '@ember-data/serializer/json-api';
import Store from '@ember-data/store';
import { AdapterError, InvalidError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, ServerError, TimeoutError, AbortError } from 'ember-data/adapter/errors';
import Transform from 'ember-data/transform';
import BooleanTransform from 'ember-data/transform/boolean';
import DateTransform from 'ember-data/transform/date';
import NumberTransform from 'ember-data/transform/number';
import StringTransform from 'ember-data/transform/string';

// ADAPTERS
// - identity
assertType<typeof DS.Adapter>(Adapter);
assertType<typeof DS.RESTAdapter>(RESTAdapter);
assertType<typeof DS.JSONAPIAdapter>(JSONAPIAdapter);
// - inheritance
assertType<typeof DS.Adapter>(RESTAdapter);
assertType<typeof DS.RESTAdapter>(JSONAPIAdapter);

// SERIALIZERS
// - identity
assertType<typeof DS.Serializer>(Serializer);
assertType<typeof DS.RESTSerializer>(RESTSerializer);
assertType<typeof DS.JSONSerializer>(JSONSerializer);
assertType<typeof DS.JSONAPISerializer>(JSONAPISerializer);
// - inheritance
assertType<typeof DS.Serializer>(JSONSerializer);
assertType<typeof DS.JSONSerializer>(RESTSerializer);
assertType<typeof DS.JSONSerializer>(JSONAPISerializer);

// MODEL
// - identity
assertType<typeof DS.Model>(Model);
// - attributes
assertType<typeof DS.attr>(attr);
// - relationships
assertType<typeof DS.hasMany>(hasMany);
assertType<typeof DS.belongsTo>(belongsTo);

// TRANSFORMS
// - identity
assertType<typeof DS.BooleanTransform>(BooleanTransform);
assertType<typeof DS.NumberTransform>(NumberTransform);
assertType<typeof DS.StringTransform>(StringTransform);
assertType<typeof DS.DateTransform>(DateTransform);
assertType<typeof DS.Transform>(Transform);

// STORE
// - identity
assertType<typeof DS.Store>(Store);

// ERRORS
// - identity
assertType<typeof DS.AdapterError>(AdapterError);
assertType<typeof DS.InvalidError>(InvalidError);
assertType<typeof DS.UnauthorizedError>(UnauthorizedError);
assertType<typeof DS.ForbiddenError>(ForbiddenError);
assertType<typeof DS.NotFoundError>(NotFoundError);
assertType<typeof DS.ConflictError>(ConflictError);
assertType<typeof DS.ServerError>(ServerError);
assertType<typeof DS.TimeoutError>(TimeoutError);
assertType<typeof DS.AbortError>(AbortError);
