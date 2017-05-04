/**
 * Created by jrjung on 2017-05-02.
 */
// Custom Event Pipeline

class EventEmitter {
  constructor() {
    this._events = {};
  }

  dispatch(event, data) {
    if (!this._events[event]) return; // no one is listening to this event
    for (let i = 0; i < this._events[event].length; i++)
      this._events[event][i](data);
  }

  subscrive(event, callback) {
    if (!this._events[event]) this._events[event] = []; // new event
    const _idx = this._events[event].push(callback);
    return {event, _idx};
  }

  destroy(obj) {
    this._events[obj.event].splice(obj._idx);
  }
}

const CustomEvent = new EventEmitter();

export default CustomEvent;