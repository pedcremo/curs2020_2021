/*
 * Publish/Subscribe Pattern
 */
export class PubSub {
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
      let indexToRemove=[];
      this.handlers.forEach((topic,index) => {
        if (topic.event === event) {
         indexToRemove.push(index);
        }
      })
      //a.filter((value,index) => {if (indexToRemove.indexOf(index)<0) return value})
      this.handlers=this.handlers.filter((value,index) => {if (indexToRemove.indexOf(index)<0) return value})
    }
  }