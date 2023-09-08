import Ember from 'ember';
import { assertType } from './lib/assert';
import Model, { attr, hasMany } from 'ember-data/model';
import { Collection } from 'ember-data/store/record-arrays';

class BlogComment extends Model {
    text = attr('string');
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'blog-comment': BlogComment;
    }
}

class BlogPost extends Model {
    title = attr('string');
    commentsAsync = hasMany('blog-comment');
    commentsSync = hasMany('blog-comment', { async: false });
}

const blogPost = BlogPost.create();

assertType<Promise<BlogComment[]>>(blogPost.get('commentsSync').reload());
assertType<BlogComment>(blogPost.get('commentsSync').createRecord());

const comment = blogPost.get('commentsSync').get('firstObject');
assertType<BlogComment | undefined>(comment);
if (comment) {
    assertType<string>(comment.get('text'));
}

assertType<Promise<Collection<<BlogComment>>(blogPost.get('commentsAsync').reload());
assertType<BlogComment>(blogPost.get('commentsAsync').createRecord());
assertType<BlogComment | undefined>(blogPost.get('commentsAsync').get('firstObject'));

const commentAsync = blogPost.get('commentsAsync').get('firstObject');
assertType<BlogComment | undefined>(commentAsync);
if (commentAsync) {
    assertType<string>(commentAsync.get('text'));
}
assertType<boolean>(blogPost.get('commentsAsync').get('isFulfilled'));

blogPost.get('commentsAsync').then(comments => {
    assertType<BlogComment | undefined>(comments.get('firstObject'));
    assertType<string>(comments.get('firstObject')!.get('text'));
});

blogPost.set('commentsAsync', blogPost.get('commentsAsync'));
blogPost.set('commentsAsync', Ember.A());
blogPost.set('commentsAsync', Ember.A([comment!]));

class PaymentMethod extends Model {}
declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'payment-method': PaymentMethod;
    }
}

class Polymorphic extends Model {
    paymentMethods = hasMany('payment-method', { polymorphic: true });
}

// $ExpectType ManyArray<any> | null
blogPost.hasMany('commentsAsync').value();
