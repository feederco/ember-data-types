import TransformRegistry from 'ember-data/types/registries/transform';
import { assertType } from './lib/assert';
import Model, { hasMany, belongsTo, attr, PromiseManyArray } from 'ember-data/model';
import Store from 'ember-data/store';
import { Collection } from 'ember-data/store/record-arrays';

declare const store: Store;


class Folder extends Model {
    @attr('string')
    name!: string;

    @hasMany('folder-belongs-to-test', { inverse: 'parent', async: false })
    children!: Collection<Folder>;

    @belongsTo('folder-belongs-to-test', { inverse: 'children', async: true })
    parent!: Folder | null;
}

class PaymentMethod extends Model {}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'folder-in-relationships': Folder;
        'payment-method': PaymentMethod;
    }
}
class Person extends Model {
    @hasMany('folder-in-relationships', { inverse: 'parent', async: false })
    children!: Folder;

    @belongsTo('folder-in-relationships', { inverse: 'children', async: false })
    parent!: Folder;
}

// $ExpectType void
Person.eachAttribute(() => {});
// $ExpectType void
Person.eachAttribute(() => {}, {});
// $ExpectType void
Person.eachAttribute((name, meta) => {
    assertType<'children' | 'parent'>(name);
    assertType<{
        type: keyof TransformRegistry;
        options: object;
        name: 'children' | 'parent';
        parentType: Model;
        isAttribute: true;
    }>(meta);
});

// $ExpectType void
Person.eachTransformedAttribute(() => {});
// $ExpectType void
Person.eachTransformedAttribute(() => {}, {});
// $ExpectType void
Person.eachTransformedAttribute((name, type) => {
    assertType<'children' | 'parent'>(name);
    assertType<keyof TransformRegistry>(type);
});

class Polymorphic extends Model {
    @attr('string')
    status!: string;

    @hasMany('payment-method', { async: false, inverse: null, polymorphic: true })
    paymentMethods!: PaymentMethod[];
}

// $ExpectType void
Polymorphic.eachRelationship(() => '');
// $ExpectType void
Polymorphic.eachRelationship(() => '', {});
// $ExpectType void
Polymorphic.eachRelationship((n, meta) => {
    assertType<never>(n);
    assertType<'belongsTo' | 'hasMany'>(meta.kind);
});

const p = Polymorphic.create();
// $ExpectType void
p.eachRelationship(() => '');
// $ExpectType void
p.eachRelationship(() => '', {});
// $ExpectType void
p.eachRelationship((n, meta) => {
    assertType<'status' | 'paymentMethods'>(n);
    assertType<'belongsTo' | 'hasMany'>(meta.kind);
});

// $ExpectType void
Polymorphic.eachRelatedType(() => '');
// $ExpectType void
Polymorphic.eachRelatedType(() => '', {});
// $ExpectType void
Polymorphic.eachRelatedType(name => {
    assertType<string>(name);
});

export class Comment extends Model {
    author = attr('string');
}

class Series extends Model {
    title = attr('string');
}

class RelationalPost extends Model {
    @attr('string')
    title!: string;

    @attr('string')
    tag!: string;

    @hasMany('comment', { inverse: null, async: true })
    comments!: PromiseManyArray<Comment>;

    @hasMany('post')
    relatedPosts!: string;

    @belongsTo('series')
    series!: string;

}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'relational-post': RelationalPost;
        comment: Comment;
        series: Series;
    }
}

let blogPost = store.peekRecord('relational-post', 1);
blogPost!.get('comments').then(comments => {
    // now we can work with the comments
    let author: string = comments[0]!.get('author');
});

blogPost!.hasMany('relatedPosts');
blogPost!.belongsTo('series');
