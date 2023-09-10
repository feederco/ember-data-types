import { computed } from '@ember/object';
import { assertType } from './lib/assert';
import { Point } from './transform';
import Model, { attr, ChangedAttributes, Errors, ModelKeys } from 'ember-data/model';
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



class Person extends Model {
    @attr()
    firstName: any;

    @attr()
    lastName: any;

    @attr({ defaultValue: 'The default' })
    title: any;

    @attr({ defaultValue: () => 'The default' })
    title2: any;

    @computed('firstName', 'lastName')
    get fullName() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }

    @attr('point', { defaultValue: () => Point.create({ x: 1, y: 2 })})
    point!: Point;

    @attr('oldPoint', { defaultValue: () => Point.create({ x: 1, y: 2 })})
    oldPoint!: Point;

    // Can't have a non-primitive as default
    // @ts-expect-error
    @attr('point', { defaultValue: Point.create({ x: 1, y: 2 })}) anotherPoint!: string;
}


const person = Person.create();
assertType<Point>(person.get('point'));
assertType<Point>(person.get('oldPoint'));

assertType<Errors>(person.get('errors'));
assertType<Errors>(person.errors);

// Ensure that 'ModelKeys' extracts all present properties
// In future we should also test AttributesFor, RelationshipsFor
// but they are just aliases for ModelKeys and don't do what they claim
type PersonProperties =
    | 'firstName'
    | 'lastName'
    | 'fullName'
    | 'title'
    | 'title2'
    | 'point'
    | 'oldPoint'
    | 'anotherPoint';

type PersonKeysType = ModelKeys<Person>;
assertType<PersonKeysType>('firstName');

// @ts-expect-error
assertType<PersonKeysType>('dateOfBirth');

// @ts-expect-error
assertType<PersonKeysType>('get');

// @ts-expect-error
assertType<PersonKeysType>('store');

class User extends Model {
    @attr('string') username!: string;
    @attr('string') email!: string;
    @attr('boolean', { defaultValue: false }) verified!: boolean;
    @attr('boolean', { allowNull: true }) canBeNull!: boolean | null;
    @attr('date', {
        defaultValue() {
            return new Date();
        },
    })
    createdAt!: Date;
}

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
