# ember-cli-bugsnag-reporter

This addon goal is to make it easy the integration of [bugsnag](https://www.bugsnag.com) to an ember app.

## Installation

```shell
ember install ember-cli-bugsnag-reporter
```

## Reporting events

By default all ember errors are automatically reported to bugsnag you have nothing to do.

If you need to manually report bugsnag's event you should use the service `bugsnag` that is exposed by this addon.
The service as 4 methods you can use to report events :

### `error(name: string | Error, metaData?: object)`

Report a bugsnag's event with the severity set to `error`. You can include some extra data to the report with the second param `metaData` (see the bugsnag's [doc](https://docs.bugsnag.com/platforms/javascript/ember/#custom-diagnostics)).

### `warning(name: string | Error, metaData?: object)`

Report a bugsnag's event with the severity set to `warning`. You can include some extra data to the report with the second param `metaData` (see the bugsnag's [doc](https://docs.bugsnag.com/platforms/javascript/ember/#custom-diagnostics)).

### `info(name: string | Error, metaData?: object)`

Report a bugsnag's event with the severity set to `info`. You can include some extra data to the report with the second param `metaData` (see the bugsnag's [doc](https://docs.bugsnag.com/platforms/javascript/ember/#custom-diagnostics)).

### `notify(name: string | Error, options?: object)`

For this one have a look to this [page](https://docs.bugsnag.com/platforms/javascript/ember/reporting-handled-errors/).

## Configuration

To configure ember-cli-bugsnag-reporter:

Add a POJO in `config/environment.js`

```javascript
{
  "bugsnag-reporter": {
    apiKey: "",
    notifyReleaseStages: ["development", "production"]
  }
}
```

The releaseStage defaults to the current application environment, if you need to set a different releaseStage that diverges from the environment, you can pass and additional attribute to the bugsnag configuration called releaseStage. It would look like this:

```javascript
{
  "bugsnag-reporter": {
    apiKey: "",
    notifyReleaseStages: ["development", "production", "staging"],
    releaseStage: "staging"
  }
}
```

The options you can set are listed [here](https://docs.bugsnag.com/platforms/javascript/configuration-options/).

## Customization

In order to send additional data along with errors reported to Bugsnag, generate a utility named bugsnag:

```shell
ember g util bugsnag
```

_Both function takes the container as an argument._

### Custom Diagnostics (docs)

To send custom meta data, define a helper method getMetaData in the app/utils/bugsnag.js you created. getMetaData takes the error and the container as arguments, e.g.:

```javascript
export function getMetaData(/* appInstance */) {
  return {
    // …some meta data
  };
}
```

This method is called for every errors and any data returned by it are included as meta data for the respective error.

```javascript
return {
  account: {
    name: "Bugsnag",
    plan: "premium",
    beta_access: true
  }
};
```

### Identifying Users (docs)

To correlate a specific user to an error and have the information appear in the User tab in the Bugsnag UI, send user data with each error data. Define a helper method getUser in the app/utils/bugsnag.js you created.

```javascript
export function getUser(appInstance) {
  const user = appInstance.lookup('service:current-user').getUser();
  return {
    email: user.email,
    id: user.id,
    name: user.name
  };
}
```

### Uploading Sourcemaps (docs)

Uploading sourcemaps to Bugsnag makes it easier to track down errors in your code because the stacktrace for each error in the Bugsnag UI highlights the exact line in your unminified source code. To send sourcemaps Bugsnag, use the Ember CLI Deploy addon [ember-cli-deploy-bugsnag](https://github.com/binhums/ember-cli-bugsnag).

### Fastboot

This addon works with [Fastboot](http://ember-fastboot.com).
To make it work you need to update your `package.json` file and add `@bugsnag/core` under `fastbootDependencies`.

```json
  "fastbootDependencies": [
    "@bugsnag/node"
  ]
```

## Contributing

------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-cli-bugsnag-reporter`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
