import Model, { ModelSchema, attr, belongsTo } from "ember-data/model";
import { Snapshot } from "ember-data/legacy-compat";
import JSONSerializer from "ember-data/serializer/json";
import JSONAPISerializer from "ember-data/serializer/json-api";
import RESTSerializer from "ember-data/serializer/rest";
import Store from "ember-data/store";

interface Dict<T> {
    [key: string]: T | null | undefined;
}

class JsonApi extends JSONAPISerializer {}

class Customized extends JSONAPISerializer {
    serialize(snapshot: Snapshot<'user'>, options: {}) {
        const lookup = snapshot.belongsTo('username');
        let json: any = this._super(...Array.from(arguments));

        json.data.attributes.cost = {
            amount: json.data.attributes.amount,
            currency: json.data.attributes.currency,
        };

        return json;
    }
    normalizeResponse(
        store: Store,
        primaryModelClass: ModelSchema<'user'>,
        payload: any,
        id: string | number,
        requestType: string,
    ) {
        payload.data.attributes.amount = payload.data.attributes.cost.amount;
        payload.data.attributes.currency = payload.data.attributes.cost.currency;

        delete payload.data.attributes.cost;

        return this._super(...Array.from(arguments));
    }
}

class EmbeddedRecordMixin extends JSONSerializer {
    attrs = {
        author: {
            serialize: false,
            deserialize: 'records',
        },
        comments: {
            deserialize: 'records',
            serialize: 'ids',
        },
    }
}

class User extends Model {}
class Comment extends Model {}

class Message extends Model {
    @attr() title: any;
    @attr() body: any;

    @belongsTo('user') author!: User;
    @belongsTo('comment') comments!: Comment[];
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'message-for-serializer': Message;
    }
}

interface CustomSerializerOptions {
    includeId: boolean;
}

class SerializerUsingSnapshots extends RESTSerializer {
    serialize(snapshot: Snapshot<'message-for-serializer'>, options: CustomSerializerOptions) {
        let json: any = {
            POST_TTL: snapshot.attr('title'),
            POST_BDY: snapshot.attr('body'),
            POST_CMS: snapshot.hasMany('comments', { ids: true }),
        };

        if (options.includeId) {
            json.POST_ID_ = snapshot.id;
        }

        return json;
    }
}

class { extends(snapshot: Snapshot<'message-for-serializer'>, options: {}) {
        let json: Dict<any> = {
            id: snapshot.id,
        };

        // $ExpectType void
        snapshot.eachAttribute((key, attribute) => {
            json[key] = snapshot.attr(key);
        });

        // $ExpectType void
        snapshot.eachRelationship((key, relationship) => {
            if (relationship.kind === 'belongsTo') {
                json[key] = snapshot.belongsTo(key, { id: true });
            } else if (relationship.kind === 'hasMany') {
                json[key] = snapshot.hasMany(key, { ids: true });
            }
        });

        return json;
    }
}
