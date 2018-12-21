import Service from "@ember/service";
import bugsnag from "bugsnag-js";

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
    // all options can be found here https://docs.bugsnag.com/platforms/browsers/js/configuration-options
    const client =  bugsnag(this.options);
    // const client =  bugsnag({
    //   apiKey: this.options.apiKey,
    //   // apiKey: ENV.bugsnag.apiKey,
    //   autoBreadcrumbs: false,
    //   autoNotify: false,
    //   interactionBreadcrumbsEnabled: true,
    //   notifyReleaseStages: ["test"],
    //   // notifyReleaseStages: ENV.bugsnag.notifyReleaseStages,
    //   releaseStage: "test"
    //   // releaseStage: ENV.environment
    // });
    this.client = client;
  },

  __send(error, options) {
    if (typeof error === "string") {
      error = new Error(error);
    }
    const notifyOptions = this.__getOptions(options);
    this.client.notify(error, notifyOptions);
    // set(client, "breadcrumbs", []); // Cleanup breadcrumbs between notify (good idea or not ?)
  },

  __getOptions(options) {
    // const { id, email, fullName } = this.current.user;
    const defaultOptions = {
      // user: {
      //   id: id,
      //   email: email,
      //   fullName: fullName
      // },
      // store: { // never sent ><
      //   id: this.current.store.id,
      //   name: this.current.store.name
      // },
      severity: "error"
    };
    return Object.assign(defaultOptions, options);
  }
});
