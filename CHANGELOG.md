# Changelog

## 0.2.0

- ENHANCEMENT: Throw an error to fail the build when `apiKey` is not defined, but only if the build environnement is listed in `notifyReleaseStages`.

## 0.1.0

- ENHANCEMENT: Report all ember's errors to bugsnag.
- ENHANCEMENT: Create a service to manually report bugsnag event.
- ENHANCEMENT: Replace bugsnag reporter with a dummy one if specified environnement is not listed in the config `[bugsnag-reporter][notifyReleaseStages]`.
