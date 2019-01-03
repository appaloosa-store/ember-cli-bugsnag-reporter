import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  bugsnag: service(),

  model() {
    this.bugsnag.info('message', { test: 'test'});
    return null;
  }
});
