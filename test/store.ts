import { service } from '@ember/service';
import Ember from 'ember';
import { assertType } from './lib/assert';
import { Comment } from './relationships';
import Store from 'ember-data/store';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Adapter from 'ember-data/adapter';
import Serializer from 'ember-data/serializer';
import { Collection } from 'ember-data/store/record-arrays';

declare const store: Store;

class PostComment extends Model {}
class Post extends Model {
    title = attr('string');
    comments = hasMany('comment');
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        post: Post;
        'post-comment': PostComment;
    }
}

let post = store.createRecord('post', {
    title: 'Rails is Omakase',
    body: 'Lorem ipsum',
});

post.save(); // => POST to '/posts'
post.save({ adapterOptions: { makeItSo: 'number one ' } });
post.save().then(saved => {
    assertType<Post>(saved);
});

store.findRecord('post', 1).then(function (post) {
    post.get('title'); // => "Rails is Omakase"
    post.set('title', 'A new post');
    post.save(); // => PATCH to '/posts/1'
});

class User extends Model {
    username = attr('string');
}

class Author extends User {}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        user: User;
        author: Author;
    }
}

store.queryRecord('user', {}).then(function (user) {
    let username = user.get('username');
    console.log(`Currently logged in as ${username}`);
});

store.findAll('post'); // => GET /posts
store.findAll('author', { reload: true }).then(function (authors) {
    authors.getEach('id'); // ['first', 'second']
});
store.findAll('post', {
    adapterOptions: { subscribe: false },
});
store.findAll('post', { include: 'comments,comments.author' });

store.peekAll('post'); // => no network request

if (store.hasRecordForId('post', 1)) {
    let maybePost = store.peekRecord('post', 1);
    if (maybePost) {
        maybePost.get('id'); // 1
    }
}

let posts = store.findAll('post'); // => GET /posts
assertType<PromiseArray<Post, Ember.ArrayProxy<Post>>>(posts);

class Message extends Model {
    hasBeenSeen = attr('boolean');
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        message: Message;
    }
}

const messages = store.peekAll('message');
messages.forEach(function (message) {
    message.set('hasBeenSeen', true);
});
messages.save();

const people = store.peekAll('user');
people.get('isUpdating'); // false
people.update().then(function () {
    people.get('isUpdating'); // false
});
people.get('isUpdating'); // true

const MyRoute = Ember.Route.extend({
    store: Ember.inject.service('store'),

    model(params: any): any {
        return this.get('store').findRecord('post', params.post_id, {
            include: 'comments,comments.author',
        });
    },
});

// Store is injectable via `inject` and resolves to `Store`.
const SomeComponent = Ember.Object.extend({
    store: Ember.inject.service('store'),

    lookUpUsers() {
        assertType<Promise<User>>(this.get('store').findRecord('user', 123));
        assertType<Promise<Collection<User>>>(this.get('store').findAll('user'));
    },
});

const MyRouteAsync = Ember.Route.extend({
    store: service('store'),

    async beforeModel(): Promise<Ember.Array<Model>> {
        const store = Ember.get(this, 'store');
        return await store.findAll('post-comment');
    },
    async model(): Promise<Model> {
        const store = this.get('store');
        return await store.findRecord('post-comment', 1);
    },
    async afterModel(): Promise<Ember.Array<Comment>> {
        const post = await this.get('store').findRecord('post', 1);
        return await post.get('comments');
    },
});

class MyRouteAsyncES6 extends Ember.Route {
    @service declare store: Store;

    async beforeModel(): Promise<Ember.Array<Model>> {
        return await this.store.findAll('post-comment');
    }
    async model(): Promise<Model> {
        return await this.store.findRecord('post-comment', 1);
    }
    async afterModel(): Promise<Ember.Array<Comment>> {
        const post = await this.store.findRecord('post', 1);
        return await post.get('comments');
    }
}

// GET to /users?filter[email]=tomster@example.com
const tom = store
    .query('user', {
        filter: {
            email: 'tomster@example.com',
        },
    })
    .then(function (users) {
        return users.get('firstObject');
    });

// GET /users?isAdmin=true
const adminsQuery = store.query('user', { isAdmin: true });
assertType<PromiseArray<User, AdapterPopulatedRecordArray<User>>>(adminsQuery);

adminsQuery.then(function (admins) {
    console.log(admins.get("length")); // 42

    // somewhere later in the app code, when new admins have been created
    // in the meantime
    //
    // GET /users?isAdmin=true
    admins.update().then(function() {
        admins.get('isUpdating'); // false
        console.log(admins.get("length")); // 123
    });

    admins.get('isUpdating'); // true
});

store.push({
    data: [
        {
            id: 1,
            type: 'album',
            attributes: {
                title: 'Fewer Moving Parts',
                artist: 'David Bazan',
                songCount: 10,
            },
            relationships: {},
        },
        {
            id: 2,
            type: 'album',
            attributes: {
                title: "Calgary b/w I Can't Make You Love Me/Nick Of Time",
                artist: 'Bon Iver',
                songCount: 2,
            },
            relationships: {},
        },
    ],
});

class UserAdapter extends Adapter {
    thisAdapterOnlyMethod(): void {}
}
class UserSerializer extends Serializer {
    thisSerializerOnlyMethod(): void {}
}

declare module 'ember-data/types/registries/adapter' {
    export default interface AdapterRegistry {
        user: UserAdapter;
    }
}

declare module 'ember-data/types/registries/serializer' {
    export default interface SerializerRegistry {
        user: UserSerializer;
    }
}

assertType<UserAdapter>(store.adapterFor('user'));
assertType<UserSerializer>(store.serializerFor('user'));

store.unloadAll();
store.unloadAll('user');

assertType<Ember.Service>(store);
