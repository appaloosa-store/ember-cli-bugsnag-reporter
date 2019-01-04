import config from '../config/environment';
import * as bugsnag from '../utils/bugsnag';

export function initialize() {
  const application = arguments[1] || arguments[0];
  const options = config['bugsnag-reporter'] || {};
  application.register('config:bugsnag', options, { instantiate: false });
  application.inject('service:bugsnag', 'options', 'config:bugsnag');

  application.register('meta:bugsnag', { getUser: bugsnag.getUser, getMetaData: bugsnag.getMetaData }, { instantiate: false });
  application.inject('service:bugsnag', 'meta', 'meta:bugsnag');
}

export default {
  name: 'bugsnag',
  initialize
};
