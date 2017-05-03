# event-emitting-promise

An extended [Promise](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise) object implementing Node's [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) methods

## Install
```bash
# With yarn
yarn add event-emitting-promise

# With npm
npm install --save event-emitting-promise
```

## Reasoning
From time to time, I found myself in the need to combine the comfortable program flow that Promises offer (especially with `async`/`await`) with the verbose usefulness of events.

My usual use case is the creation of CLI versions from functions I've wrote. Using this package, that can be done pretty easily.

## Usage

Let's say we want to create a programmatic and a CLI version of a function called `myFunc()`.

Consider this the `my-func.js`:
```javascript
const EventEmittingPromise = require('event-emitting-promise')

// Asynchronous partial tasks
const { task1, } = require('./somewhere')

module.exports = function myFunc () {
  // The EventEmittingPromise constructor callback takes an
  // additional argument called "emit", which is the
  // EventEmitter.prototype.emit method.
  return new EventEmittingPromise(async (resolve, reject, emit) => {
    const result1 = await task1
    emit('partial', 'task1', result1)

    const result2 = await task2
    emit('partial', 'task2', result2)

    const result3 = await task3
    emit('partial', 'task3', result3)

    return {
      task1: result1,
      task2: result2,
      task3: result3
    }
  })
}
```

And this the `my-func-cli.js`:
```javascript
const myFunc = require('./my-func')

module.exports = function myFuncCLI () {
  return myFunc()
    // The created Promise provides all of the EventEmitter methods
    // (except emit) and allows chaining them.
    .on('partial-done', (name, result) => {
      console.log(
        `Partial task ${name} has finished with result:`,
        result
      )
    })
    .then(() => {
      console.log('Done.')
    })
    .catch(err => {
      console.error('An error occurred:', err)
    })  
}
```

That way, places calling `myFunc()` can easily be informed about the progress of the function call.