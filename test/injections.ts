import { service } from '@ember/service';
import Store from 'ember-data/store';
import Route from '@ember/routing/route';
import Model from 'ember-data/model';
import { Collection } from 'ember-data/store/record-arrays';

class MyModel extends Model {}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'my-model': MyModel;
    }
}

class RouteTest extends Route {
    @service declare store: Store;

    model(): Promise<Collection<MyModel>> {
        return this.store.findAll('my-model');
    }
}
