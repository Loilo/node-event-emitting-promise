const EventEmitter = require('events')

/**
 * Returns a Promise with all `EventEmitter` methods (except `emit`) appended
 */
module.exports = class EventEmittingPromise extends Promise {
  constructor (callback) {
    const emitter = new EventEmitter
    super((resolve, reject) => {
        callback(resolve, reject, (eventName, ...args) => {
          emitter.emit(eventName, ...args)
        })
    })
    this.emitter = emitter
  }

  addListener (eventName, listener) {
    this.emitter.addListener(eventName, listener)
    return this
  }

  eventNames () {
    return this.emitter.eventNames()
  }

  getMaxListeners () {
    return this.emitter.getMaxListeners()
  }

  listenerCount (eventName) {
    return this.emitter.listenerCount(eventName)
  }

  listeners (eventName) {
    return this.emitter.listeners(eventName)
  }

  on (eventName, listener) {
    this.emitter.on(eventName, listener)
    return this
  }

  once (eventName, listener) {
    this.emitter.once(eventName, listener)
    return this
  }

  prependListener (eventName, listener) {
    this.emitter.prependListener(eventName, listener)
    return this
  }

  prependOnceListener (eventName, listener) {
    this.emitter.prependOnceListener(eventName, listener)
    return this
  }

  removeAllListeners (eventName, listener) {
    this.emitter.removeAllListeners(eventName, listener)
    return this
  }

  removeListener (eventName, listener) {
    this.emitter.removeListener(eventName, listener)
    return this
  }

  setMaxListeners (eventName, listener) {
    this.emitter.setMaxListeners(eventName, listener)
    return this
  }
}
