import Service from "@ember/service";

export default Service.extend({

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
    // eslint-disable-next-line no-console
    const logger = console[options.severity] || console.info;
    logger(error, options);
  }
});
