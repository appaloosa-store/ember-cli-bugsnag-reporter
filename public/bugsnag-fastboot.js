/* globals define FastBoot */
define('@bugsnag/js', ['exports'], function(exports) {
  const bugsnag = FastBoot.require('@bugsnag/node');
  exports.default = bugsnag.default;
});
