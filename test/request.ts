import RequestManager, { Future, Handler, NextFn, RequestContext } from 'ember-data/request';
import Fetch from 'ember-data/request/fetch';

const Auth: Handler = {
  request<T = unknown>(context: RequestContext, next: NextFn<T>): Promise<T> | Future<T> {
    return next(context.request);
  }
}

const apiUrl = "example.com";

// ... create manager

const manager = new RequestManager();
manager.use([Auth, Fetch]);

// ... execute a request

const response = await manager.request({
  url: `${apiUrl}/users`
});
