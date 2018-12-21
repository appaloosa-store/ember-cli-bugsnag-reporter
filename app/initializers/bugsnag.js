import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];
  const options = config['bugsnag-reporter'] || {};
  application.register('config:bugsnag', options, { instantiate: false });
  application.inject('service:bugsnag', 'options', 'config:bugsnag');
}

export default {
  name: 'bugsnag',
  initialize
};
