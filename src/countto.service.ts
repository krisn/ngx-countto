import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
// import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeWhile';

/** Helper */
const clamp = (n, min, max) => {
  if (n < min) {
    return min;
  }
  if (n > max) {
    return max;
  }
  return n;
};

@Injectable()
export class CountToService {

  listeners: any = {};
  events: any;
  state = new Subject();

  /** Trickling stream */
  trickling = new Subject();

  progress = 0;
  maximum = 1;
  minimum = 0.08;
  speed = 200;
  trickleSpeed = 300;

  constructor() {

    this.events = Observable.from(this.state);

    this.events.subscribe(
      ({id, args}) => {
        console.log('srv sub', id, args);
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

    /*this.trickling.switchMap(() => {
      return Rx.Observable
        .timer(0, this.trickleSpeed)
        .takeWhile(() => this.isStarted())
        .do(() => this.inc());
    }).subscribe();*/
  }

  register(id, listener) {
    if (!this.listeners[id]) {
      this.listeners[id] = [];
    }

    this.listeners[id].push(listener);
    console.log('srv reg', id, this.listeners);
  }

  /** Increment Progress */
  inc(amount?) {
    let n = this.progress;
    /** if it hasn't start, start */
    if (!this.isStarted()) {
      this.start('');
    } else {
      if (typeof amount !== 'number') {
        if (n >= 0 && n < 0.2) {
          amount = 0.1;
        } else if (n >= 0.2 && n < 0.5) {
          amount = 0.04;
        } else if (n >= 0.5 && n < 0.8) {
          amount = 0.02;
        } else if (n >= 0.8 && n < 0.99) {
          amount = 0.005;
        } else {
          amount = 0;
        }
      }
      n = clamp(n + amount, 0, 0.994);
      this.set(n);
    }
  }

  /** Set progress state */
  set(n) {
    this.progress = clamp(n, this.minimum, this.maximum);
    this.updateState(this.progress, true);
    /** if progress completed */
    if (n === this.maximum) {
      const hide = () => {
        /**
         *  reset progress
         *  Keep it { 0, false } to fadeOut progress-bar after complete
         */
        if (this.progress >= this.maximum) {
          this.progress = 0;
          this.updateState(this.progress, false);
        }
      };
      const complete = () => {
        /**
         * complete progressbar
         * { 1, false } to complete progress-bar before hiding
         */
        if (this.progress >= this.maximum) {
          this.updateState(this.progress, false);
          setTimeout(hide, this.speed);
        }
      };
      setTimeout(complete, this.speed);
    }
  }

  /** Start */
  start(id) {
    id = id || 'countto';
    console.log('srv start', id);
    this.state.next({id});

    /*if (!this.isStarted()) {
      this.set(this.minimum);
    }
    this.trickling.next();*/
  }

  /** Done */
  done() {
    /** if started complete the progress */
    if (this.isStarted()) {
      this.set(.3 + .5 * Math.random());
      this.set(this.maximum);
    }
  }

  /** Is progress started */
  isStarted(): boolean {
    return this.progress > 0 && this.progress < this.maximum;
  }

  /** Update Progressbar State */
  private updateState(progress, isActive) {
    this.state.next({
      active: isActive,
      value: progress
    });
  }
}
