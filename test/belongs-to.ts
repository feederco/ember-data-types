import Store from 'ember-data/store';
import { Collection } from 'ember-data/store/record-arrays';
import { assertType } from './lib/assert';
import Model, { AsyncBelongsTo, attr, belongsTo, hasMany } from 'ember-data/model';

declare const store: Store;

class Folder extends Model {
    @attr('string')
    name!: string;

    @hasMany('folder', { inverse: 'parent', async: false })
    children!: Collection<Folder>;

    @belongsTo('folder', { inverse: 'children', async: false })
    parent!: Folder | null;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        folder: Folder;
    }
}

const folder = Folder.create();
assertType<AsyncBelongsTo<Folder | null>>(folder.get('parent'));
assertType<string | undefined>(folder.get('parent').get('name'));
folder.get('parent').set('name', 'New');
folder.get('parent').then(parent => {
    assertType<Folder | null>(parent);
    if (parent) {
        assertType<string>(parent.get('name'));
    }
    folder.set('parent', parent);
});

folder.set('parent', folder);
folder.set('parent', folder.get('parent'));
folder.set('parent', store.findRecord('folder', 3));

// $ExpectType Model | null
folder.belongsTo('parent').value();
