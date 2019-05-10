# Changelog

## 0.5.2

- FIX: Now the addon works perfectly in fastboot, without any extra configuration or random fail.

## 0.5.0

- FEAT: Add Fastboot support. It's now possible to report errors to bugsnag when the app run on fastboot side.
- BUILD: Upgrade dependencies

## 0.4.2/0.4.3

- FIX: Throw missing apiKey error when apiKey error is missing on releage stages

## 0.4.0

- BUILD: Drop node 6
- REFACTOR: Stop rewritting addon config to fix ember-cli warning message

## 0.3.6

- FIX: Replace `bugsnag-js` package with `@bugsnag/js` package

## 0.3.2

- FIX: Don't throw an error when API_KEY is not null

## 0.3.0

- FIX: Import of utils function no longer fail if only one function is defined in `utils/bugsnag.js`
- ENHANCEMENT: Send app instance to utils function to permit the use of services in those functions.

## 0.2.0

- ENHANCEMENT: Throw an error to fail the build when `apiKey` is not defined, but only if the build environnement is listed in `notifyReleaseStages`.

## 0.1.0

- ENHANCEMENT: Report all ember's errors to bugsnag.
- ENHANCEMENT: Create a service to manually report bugsnag event.
- ENHANCEMENT: Replace bugsnag reporter with a dummy one if specified environnement is not listed in the config `[bugsnag-reporter][notifyReleaseStages]`.
