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
  speed = 100;

  constructor(private counttoService: CountToService,
              private elementRef: ElementRef) {
    // this.state = counttoService.state;
  }

  ngAfterContentInit() {
    // this.from = this.elementRef.nativeElement.innerHTML || 0;
    this.progress = this.from;
    this.output = this.from;

    const totals = {
      trillions : this.to >= 1000000000000000 ? 999 : Math.floor(this.to / 1000000000000),
      billions  : this.to >= 1000000000000 ? 999 : Math.floor(this.to / 1000000000),
      millions  : this.to >= 1000000000 ? 999 : Math.floor(this.to / 1000000),
      thousands : this.to >= 1000000 ? 999 : Math.floor(this.to / 1000),
      digits    : this.to >= 1000 ? 999 : this.to,
    };

    console.log('self.totals', totals);
    const total_output = Object.keys(totals).reduce((previous, current) => {
      previous += totals[current];
      return previous;
    }, 0);
    console.log('total_output', total_output);
    this.speed = Math.floor(this.duration / 3000); // total_output);

    this.counttoService.register(this.id, () => {
      this.start(totals.digits, this.speed, 1, '',
        totals.thousands ? () => { this.start(totals.thousands, this.speed, 1, 'K',
          totals.millions ? () => { this.start(totals.millions, this.speed, 1, 'M',
            totals.billions ? () => { this.start(totals.billions, this.speed, 1, 'B',
              totals.trillions ? () => { this.start(totals.trillions, this.speed, 1, 'T',
                null
                ); } : null
              ); } : null
            ); } : null
          ); } : null
      );
    });
  }

  ngOnDestroy() {
    // this.counttoService.state.unsubscribe();
  }

  private start(take, speed, steps = 1, postfix = '', next = null, delay = 0) {
    console.log('take-speed-delay', take, speed, delay);
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
        // console.log(this.output);
      });
  }

  isStarted(): boolean {
    return this.progress > 0 && this.progress < this.to;
  }
}
