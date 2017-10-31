import { Component, Input, Output, EventEmitter, AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { CountToService } from './countto.service';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'ngx-countto',
  template: `{{output}}`
})
export class CountToComponent implements OnDestroy, AfterContentInit {

  @Input() id = 'countto';
  @Input() from = 0;
  @Input() to: number;
  @Input() ease;
  @Input() duration = 5000;

  @Output() onFinish: EventEmitter<any>;

  state: any;
  progress: number;
  output: any;
  speed = 50;

  constructor(private counttoService: CountToService,
              private elementRef: ElementRef) {
    // this.state = counttoService.state;
  }

  ngAfterContentInit() {
    // this.from = this.elementRef.nativeElement.innerHTML || 0;
    this.progress = this.from;
    this.output = this.from;

    const ranges = [
      { range: 'trillions', postfix: 'T', count: this.to >= 1000000000000000 ? 999 : Math.floor(this.to / 1000000000000) },
      { range: 'billions',  postfix: 'B', count: this.to >= 1000000000000 ? 999 : Math.floor(this.to / 1000000000) },
      { range: 'millions',  postfix: 'M', count: this.to >= 1000000000 ? 999 : Math.floor(this.to / 1000000) },
      { range: 'thousands', postfix: 'K', count: this.to >= 1000000 ? 999 : Math.floor(this.to / 1000) },
      { range: 'digits',    postfix: '',  count: this.to >= 1000 ? 999 : this.to },
    ];
    const output = ranges.reduce((acc, curr) => {
      acc.total += curr.count;
      const speed = curr.count > 500 ? 10
                  : curr.count > 100 ? 50
                  : curr.count > 50 ? 100
                  : 100;
      const steps = curr.count > 500 ? 10
                  : curr.count > 100 ? 5
                  : 1;
      const fn = acc.next;
      acc.next = curr.count > 0 ? () => this.start(Math.floor(curr.count / steps), speed, steps, curr.postfix, fn) : null;
      return acc;
    }, { total: 0, next: null });
    console.log('output', output);
    // this.speed = Math.floor(this.duration / output.total);

    this.counttoService.register(this.id, () => {
      output.next();
    });
  }

  ngOnDestroy() {
    // this.counttoService.state.unsubscribe();
  }

  private start(take, speed, steps = 1, postfix = '', next = null, delay = 10) {
    console.log('take-speed-postfix', take, speed, postfix);
    Rx.Observable
      .timer(delay, speed)
      .take(take + 1)
      .map(val => `${val * steps} ${postfix}`)
      .finally(next)
      .subscribe(val => {
        // this.progress = val + this.from;
        // this.output = val + this.from;
        // this.output = this.output > 1000 ? (this.output / 1000).toFixed(3) + 'K' : this.output;
        this.output = val;
      });
  }

  isStarted(): boolean {
    return this.progress > 0 && this.progress < this.to;
  }
}
