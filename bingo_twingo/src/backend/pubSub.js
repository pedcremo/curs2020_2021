/*
 * Publish/Subscribe Pattern
 */
class PubSub {
  constructor() {
    this.handlers = [];
  }

  subscribe(event, handler, context) {
    if (typeof context === 'undefined') { context = handler; }
    this.handlers.push({ event: event, handler: handler.bind(context) });
  }

  publish(event, args) {
    this.handlers.forEach(topic => {
      if (topic.event === event) {
        topic.handler(args)
      }
    })
  }

  unsubscribe(event) {
    var filtered = this.handlers.filter(function (el) { return el.event != event; });
    this.handlers = filtered;
  }
}

module.exports = PubSub;