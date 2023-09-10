import { computed } from '@ember/object';
import { ModelSchema } from '@ember-data/model';
import JSONAPIAdapter from 'ember-data/adapter/json-api';
import RESTAdapter from 'ember-data/adapter/rest';
import Store from 'ember-data/store';
import Service, { service } from '@ember/service';

class Session extends Service {
    authToken!: string;
}
declare module '@ember/service' {
    interface Registry {
        session: Session;
    }
}

class JsonApi extends JSONAPIAdapter {
    // Application specific overrides go here
}

class Customized extends JSONAPIAdapter {
    host = 'https://api.example.com';
    namespace = 'api/v1';
    headers = {
        API_KEY: 'secret key',
        ANOTHER_HEADER: 'Some header value',
    }
}

class AuthTokenHeader extends JSONAPIAdapter {
    @service
    session!: Session;

    @computed('session.authToken')
    get headers() {
        return {
            API_KEY: this.session.authToken,
            ANOTHER_HEADER: 'Some header value',
        };
    }
}

// Ensure that we are allowed to overwrite properties with a getter
class GetterTest extends JSONAPIAdapter {
    get coalesceFindRequests() {
        return false;
    }
    get namespace() {
        return 'api/v1';
    }
    get host() {
        return 'https://api.example.com';
    }
    get headers() {
        return {
            CUSTOM_HEADER: 'Some header value',
        };
    }
}

class UseAjax extends JSONAPIAdapter {
    query(store: Store, type: ModelSchema, query: object) {
        const url = 'https://api.example.com/my-api';
        return this.ajax(url, 'POST', {
            param: 'foo',
        });
    }
}

class UseAjaxOptions extends JSONAPIAdapter {
    query(store: Store, type: ModelSchema, query: object) {
        const url = 'https://api.example.com/my-api';
        const options = this.ajaxOptions(url, 'DELETE', {
            foo: 'bar',
        });
        return fetch(url, {
            ...options,
        });
    }
}

class UseAjaxOptionsWithOptionalThirdParams extends JSONAPIAdapter {
    query(store: Store, type: ModelSchema, query: object) {
        const url = 'https://api.example.com/my-api';
        const options = this.ajaxOptions(url, 'DELETE');
        return fetch(url, {
            ...options,
        });
    }
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        rootModel: any;
        'super-user': any;
    }
}

// https://github.com/emberjs/data/blob/c9d8212c857ca78218ad98d11621819b38dba98f/tests/unit/adapters/build-url-mixin/build-url-test.js
class BuildURLAdapter extends RESTAdapter {
    worksWithOnlyModelNameAndId() {
        this.buildURL('rootModel', 1);
    }

    worksWithFindRecord() {
        this.buildURL('super-user', 1, {} as any, 'findRecord');
    }

    worksWithFindAll() {
        this.buildURL('super-user', null, {} as any, 'findAll');
    }

    worksWithQueryStub() {
        this.buildURL('super-user', null, null, 'query', { limit: 10 });
    }

    worksWithQueryRecord() {
        this.buildURL('super-user', null, null, 'queryRecord', { companyId: 10 });
    }

    worksWithFindMany() {
        this.buildURL('super-user', [1, 2, 3], null, 'findMany');
    }

    worksWithFindHasMany() {
        this.buildURL('super-user', 1, {} as any, 'findHasMany');
    }

    worksWithFindBelongsTo() {
        this.buildURL('super-user', 1, {} as any, 'findBelongsTo');
    }

    worksWithCreateRecord() {
        this.buildURL('super-user', 1, {} as any, 'createRecord');
    }

    worksWithUpdateRecord() {
        this.buildURL('super-user', 1, {} as any, 'updateRecord');
    }

    worksWithDeleteRecord() {
        this.buildURL('super-user', 1, {} as any, 'deleteRecord');
    }

    worksWithUnknownRequestType() {
        this.buildURL('super-user', 1, null, 'unknown');
        this.buildURL('super-user', null, null, 'unknown');
    }
}
