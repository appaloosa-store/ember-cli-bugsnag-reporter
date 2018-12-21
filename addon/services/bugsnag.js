import Service from "@ember/service";
import bugsnag from "bugsnag-js";

export default Service.extend({

  __client: null,

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
  // shouldNotify() { // no need, addon should not be included if not a valid env
  //   const currentEnv = ENV.environment;
  //   const bugsnagConfig = ENV.bugsnag || {};
  //   const notifyReleaseStages = bugsnagConfig.notifyReleaseStages;
  //   return notifyReleaseStages.includes(currentEnv);
  // }

  __sendNotif(error, options) {
    if (this.client === null) {
      this.__setupBugsnag();
    }
    return this.__send(error, options);
  },

  __setupBugsnag() {
    // all options can be found here https://docs.bugsnag.com/platforms/browsers/js/configuration-options
    const client =  bugsnag({
      apiKey: "test",
      // apiKey: ENV.bugsnag.apiKey,
      autoBreadcrumbs: false,
      autoNotify: false,
      interactionBreadcrumbsEnabled: true,
      notifyReleaseStages: ["test"],
      // notifyReleaseStages: ENV.bugsnag.notifyReleaseStages,
      releaseStage: "test"
      // releaseStage: ENV.environment
    });

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
// import ENV from "appaloosa-frontend/config/environment";
// import { inject as service } from "@ember/service";

// export default Service.extend({
//   current: service(),

//   bugsnagClient: null,

//   info(error, metaData) {
//     this.notify.call(this, error, { severity: "info", metaData });
//   },
//   warning(error, metaData) {
//     this.notify.call(this, error, { severity: "warning", metaData });
//   },
//   error(error, metaData) {
//     this.notify.call(this, error, { severity: "error", metaData });
//   },
//   notify(error, options = {}) {
//     if (this.__shouldNotify()) {
//       return this.__notify(error, options);
//     }
//     /* eslint-disable no-console*/
//     console.error(error);
//     /* eslint-enable no-console*/
//   },
//   __shouldNotify() {
//     const currentEnv = ENV.environment;
//     const bugsnagConfig = ENV.bugsnag || {};
//     const notifyReleaseStages = bugsnagConfig.notifyReleaseStages;
//     return notifyReleaseStages.includes(currentEnv);
//   },
//   __notify(error, options) {
//     if (this.bugsnagClient === null) {
//       this.__setupBugsnag();
//     }
//     return this.__sendError(error, options);
//   },
//   __setupBugsnag() {
//     // all options can be found here https://docs.bugsnag.com/platforms/browsers/js/configuration-options
//     const client =  bugsnag({
//       apiKey: ENV.bugsnag.apiKey,
//       autoNotify: false,
//       autoBreadcrumbs: false,
//       interactionBreadcrumbsEnabled: true,
//       releaseStage: ENV.environment,
//       notifyReleaseStages: ENV.bugsnag.notifyReleaseStages
//     });

//     set(this, "bugsnagClient", client);
//   },
//   __sendError(error, options) {
//     if (typeof error === "string") {
//       error = new Error(error);
//     }
//     const notifyOptions = this.__getOptions(options);
//     const client = this.bugsnagClient;
//     client.notify(error, notifyOptions);
//     // set(client, "breadcrumbs", []); // Cleanup breadcrumbs between notify (good idea or not ?)
//   },

//   __getOptions(options) {
//     const { id, email, fullName } = this.current.user;
//     const defaultOptions = {
//       user: {
//         id: id,
//         email: email,
//         fullName: fullName
//       },
//       store: {
//         id: this.current.store.id,
//         name: this.current.store.name
//       },
//       severity: "error"
//     };
//     return Object.assign(defaultOptions, options);
//   }
// });
