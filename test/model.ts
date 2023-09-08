import Ember from 'ember';
import { assertType } from './lib/assert';
import { Point } from './transform';
import Model, { attr, ChangedAttributes } from 'ember-data/model';
import Store from 'ember-data/store';

enum MyEnum {
    hello,
    there,
}

class Hello extends Model {
    @attr('enum', { allowedValues: MyEnum }) declare myEnum: MyEnum;
}

const hello = Hello.create();
assertType<MyEnum>(hello.get('myEnum'));

const Person = Model.extend({
    firstName: attr(),
    lastName: attr(),
    title: attr({ defaultValue: 'The default' }),
    title2: attr({ defaultValue: () => 'The default' }),

    fullName: Ember.computed('firstName', 'lastName', function () {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),

    point: attr('point', { defaultValue: () => Point.create({ x: 1, y: 2 })}),
    oldPoint: attr('oldPoint', { defaultValue: () => Point.create({ x: 1, y: 2 })}),

    // Can't have a non-primitive as default
    // @ts-expect-error
    anotherPoint: attr('point', { defaultValue: Point.create({ x: 1, y: 2 })})
});

const person = Person.create();
assertType<Point>(person.get('point'));
assertType<Point>(person.get('oldPoint'));

assertType<Errors>(person.get('errors'));
assertType<Errors>(person.errors);

const User = Model.extend({
    username: attr('string'),
    email: attr('string'),
    verified: attr('boolean', { defaultValue: false }),
    canBeNull: attr('boolean', { allowNull: true }),
    createdAt: attr('date', {
        defaultValue() {
            return new Date();
        },
    }),
});

const user = User.create({ username: 'dwickern' });
assertType<string>(user.get('id'));
assertType<string>(user.get('username'));
assertType<boolean>(user.get('verified'));
assertType<Date>(user.get('createdAt'));
assertType<Store>(user.get('store'));

user.serialize();
user.serialize({ includeId: true });
user.serialize({ includeId: true });

const attributes: ChangedAttributes = user.changedAttributes();

user.rollbackAttributes(); // $ExpectType void

let destroyResult: Promise<typeof user>;
destroyResult = user.destroyRecord();
destroyResult = user.destroyRecord({});
destroyResult = user.destroyRecord({ adapterOptions: {} });
destroyResult = user.destroyRecord({ adapterOptions: { waffles: 'are yummy' } });

user.deleteRecord(); // $ExpectType void

user.unloadRecord(); // $ExpectType void

let jsonified: object;
jsonified = user.toJSON();
jsonified = user.toJSON({ includeId: true });

let reloaded: Promise<typeof user>;
reloaded = user.reload();
reloaded = user.reload({});
reloaded = user.reload({ adapterOptions: {} });
reloaded = user.reload({ adapterOptions: { fastAsCanBe: 'yessirree' } });
