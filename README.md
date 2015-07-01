# The PostageApp Mailer App

The PostageApp mailer app provides a Foxx script and `Foxx.queues` job type for sending transactional emails with [PostageApp](https://postageapp.com/).

**Note:** Version 2.0.0 and higher require ArangoDB 2.6 or later to work correctly.

*Examples*

First add this app to your dependencies:

```js
{
  ...
  "dependencies": {
    "mailer": "mailer-postageapp:^2.0.0"
  }
  ...
}
```

Once you've configured both apps correctly, you can use it like this:

```js
var Foxx = require('org/arangodb/foxx');
var queue = Foxx.queues.get('default');

queue.push(applicationContext.dependencies.mailer, {
    recipients: 'john.doe@employees.initech.example',
    header: {
        subject: 'Termination',
        from: 'postmaster@initech.example'
    },
    content: {
        'text/html': '<blink>YOU ARE FIRED!</blink>'
    }
});
```

## Configuration

This app has the following configuration options:

* *apiKey*: Your PostageApp project's API key. You can find this on the page for the PostageApp project you want this app to use.
* *maxFailures* (optional): The maximum number of times each job will be retried if it fails. Default: *0* (don't retry).

## Job Data

For full documentation of all job data options supported by PostageApp see [the official PostageApp API documentation](http://help.postageapp.com/kb/api/send_message).

## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0) by ArangoDB GmbH.
