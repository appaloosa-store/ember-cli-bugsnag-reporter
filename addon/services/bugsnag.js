import Service from "@ember/service";
import smartMerge from '../utils/smartMerge';
import { getOwner } from '@ember/application';

export default Service.extend({

  __client: null,

  init() {
    this._setupClient();
    this._super(...arguments);
  },
  info(error, metaData) {
    this.notify.call(this, error, { severity: "info", metaData });
  },

  warning(error, metaData) {
    this.notify.call(this, error, { severity: "warning", metaData });
  },

  error(error, metaData) {
    this.notify.call(this, error, { severity: "error", metaData });
  },

  notify(error, options = {}) {
    return this.__sendNotif(error, options);
  },

  __sendNotif(error, options) {
    if (this.client === null) {
      this._setupClient();
    }
    return this.__send(error, options);
  },

  _setupClient() {
    if (window.navigator === null) {
      /* eslint-disable no-console */
      let module = require('@bugsnag/node')
      console.warn("This addon does not work with fastboot at the moment, all logs will be redirected to the console");
      return this.client = {
        notify: (error, options) => {
          const logger = console[options.severity] || console.info;
          logger(error, this.__getOptions(options));
        }
      }
      /* eslint-enable no-console */
    }

    // all options can be found here https://docs.bugsnag.com/platforms/browsers/js/configuration-options
    this.client = Promise.resolve(import("@bugsnag/js"))
                    .then(module => module.default)
                    .then(bugsnag => {
                      let client = bugsnag(this.options);
                      this.client = client;
                    });
  },

  async __send(error, options) {
    if (typeof error === "string") {
      error = new Error(error);
    }
    const notifyOptions = this.__getOptions(options);
    if (this.client.then !== undefined) {
      await this.client;
    }
    this.client.notify(error, notifyOptions);
    // set(client, "breadcrumbs", []); // Cleanup breadcrumbs between notify (good idea or not ?)
  },

  __getOptions(options) {
    const defaultOptions = this.__getDefaultOptions();
    options = smartMerge(defaultOptions, options);
    return Object.assign({}, defaultOptions, options);
  },

  __getDefaultOptions() {
    let options = {
      severity: "error"
    };
    if (this.meta.getUser) {
      options.user = this.meta.getUser(getOwner(this));
    }
    if (this.meta.getMetaData) {
      options.metaData = this.meta.getMetaData(getOwner(this));
    }
    return options;
  }
});
