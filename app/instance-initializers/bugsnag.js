import Ember  from 'ember';

export function initialize(appInstance) {
  const bugsnag = appInstance.lookup('service:bugsnag');
  Ember.onerror = (error) => bugsnag.error(error); // catch and reports all ember errors
}

export default {
  initialize
};
