import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
// import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class CountToService {

  listeners: any = {};
  events: any;
  state = new Subject();
  progress = 0;
  speed = 200;

  constructor() {

    this.events = Observable.from(this.state);

    this.events.subscribe(
      ({id, args}) => {
        // console.log('srv sub', id, args);
        let ct = 0;
        const fnCheck = () => {
          if (ct > 2) { return; }
          if (!this.listeners[id]) {
            ct++;
            window.setTimeout(fnCheck, 500);
          } else {
            for (const listener of this.listeners[id]) {
              listener(...args);
            }
          }
        }
        fnCheck();
      });
  }

  /** Registers a component with the service **/
  register(id, listener) {
    if (!this.listeners[id]) {
      this.listeners[id] = [];
    }

    this.listeners[id].push(listener);
    // console.log('srv reg', id, this.listeners);
  }

  /** Start counting **/
  start(id) {
    id = id || 'countto';
    // console.log('srv start', id);
    this.state.next({id});
  }
}
