import Service from "@ember/service";
import smartMerge from "../utils/smartMerge";

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
    logger(error, this.__getOptions(options));
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
    options.user = this.meta.getUser();
    options.metaData = this.meta.getMetaData();
    return options;
  }

});
