/* eslint-env node */
'use strict';
const Funnel = require('broccoli-funnel');
const rename = require('broccoli-stew').rename;
const map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-cli-bugsnag-reporter',

  notifyReleaseStages: [],

  __checkApiKeyPresence(apiKey) {
    if (apiKey === undefined || apiKey === null || apiKey.trim() === "") {
      throw new Error("ember-cli-bugsnag-reporter requires a value for ENV['bugsnag-reporter']['apiKey']");
    }
  },

  config: function(environment, appConfig) {
    const options = appConfig['bugsnag-reporter'] || {};
    options.notifyReleaseStages = options.notifyReleaseStages || [];
    options.releaseStage = options.releaseStage || environment;

    appConfig['bugsnag-reporter'] = options;
    this.notifyReleaseStages = options.notifyReleaseStages;
    this.releaseStage = options.releaseStage;
    this.apiKey = options.apiKey;
    return appConfig;
  },

  __shouldIncludeDummyService() {
    this.useDummyService = this.notifyReleaseStages.indexOf(this.releaseStage) === -1;
    return this.useDummyService;
  },

  included: function() {
    this._super.included.apply(this, arguments);
    // Remove @bugsnag/js from the build
    if (this.__shouldIncludeDummyService() === true) {
      // this.options.autoImport = {
      //   exclude: ['@bugsnag/js']
      // }
    } else {
      this.__checkApiKeyPresence(this.apiKey);
    }
  },

  // Add node version of `bugsnag` into fastboot package.json manifest vendorFiles array
  updateFastBootManifest(manifest) {
    manifest.vendorFiles.push('ember-cli-bugsnag-reporter/bugsnag-fastboot.js');
    return manifest;
  },
  // Rename the service 'bugsnag-dummy' in 'bugsnag' if needed
  treeFor: function(name) {
    if (name === 'addon' || name === 'app') {
      return map(this._super.treeFor.apply(this, arguments), (content) => {
        return content.replace('/bugsnag-dummy', '/bugsnag');
      });
    }
    return this._super.treeFor.apply(this, arguments);
  },
  // remove unwanted service depending on the value of `useDummyService`
  treeForAddon: function() {
    // see: https://github.com/ember-cli/ember-cli/issues/4463
    let tree = this._super.treeForAddon.apply(this, arguments);

    if (this.useDummyService === true) {
      tree = new Funnel(tree, {
        exclude: ['ember-cli-bugsnag-reporter/services/bugsnag.js']
      });
      tree = rename(tree, 'ember-cli-bugsnag-reporter/services/bugsnag-dummy.js', 'ember-cli-bugsnag-reporter/services/bugsnag.js');
    } else {
      tree = new Funnel(tree, {
        exclude: ['ember-cli-bugsnag-reporter/services/bugsnag-dummy.js']
      });
    }
    // var loggedApp = log(tree, { output: 'tree', label: 'my-app-name tree' });
    return tree;
  },
  options: {
    babel: {
      plugins: [ require.resolve('ember-auto-import/babel-plugin') ]
    }
  }
};
