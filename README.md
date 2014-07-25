# The PostageApp Mailer App

The PostageApp mailer app provides a `Foxx.queues` job type for sending transactional emails with [PostageApp](https://postageapp.com/).

*Examples*

```js
var Foxx = require('org/arangodb/foxx'),
    queue = Foxx.queues.create('my-queue', 1);

queue.push('mailer.postageapp', {
    recipients: 'john.doe@employees.initech.example',
    header: {
        subject: 'Termination',
        from: 'postmaster@initech.example'
    },
    content: {
        'text/html': '<blink>YOU ARE FIRED!</blink>'
    }
});

// or if you prefer not to hardcode the job type:

queue.push(Foxx.requireApp('/postageapp-mailer-mountpoint').mailer.jobType, {
    // ...
});
```

## Configuration

This app has the following configuration options:

* *apiKey*: Your PostageApp project's API key. You can find this on the page for the PostageApp project you want this app to use.
* *jobType* (optional): The name under which the mailer app's job type will be available. Default: *mailer.postageapp*.
* *maxFailures* (optional): The maximum number of times each job will be retried if it fails. Default: *0* (don't retry).

## Job Data

For full documentation of all job data options supported by PostageApp see [the official PostageApp API documentation](http://help.postageapp.com/kb/api/send_message).