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
  totals: any = {
    trillions: 0,
    billions: 0,
    millions: 0,
    thousands: 0,
    digits: 0,
  };

  constructor(private counttoService: CountToService,
              private elementRef: ElementRef) {
    // this.state = counttoService.state;
  }

  ngAfterContentInit() {
    // this.from = this.elementRef.nativeElement.innerHTML || 0;
    this.progress = this.from;
    this.output = this.from;

    this.totals.trillions = this.to >= 1000000000000 ? Math.floor(this.to / 1000000000000) : 0;
    this.totals.billions = this.to >= 1000000000 ? Math.floor(this.to / 1000000000) : 0;
    this.totals.millions = this.to >= 1000000 ? Math.floor(this.to / 1000000) : 0;
    this.totals.thousands = this.to >= 1000 ? Math.floor(this.to / 1000) : 0;
    this.totals.digits = this.to >= 1000 ? 999 : this.to;
    const self = this;
    console.log('self.totals', self.totals);
    const total_output = Object.keys(this.totals).reduce((previous, current) => {
      previous += self.totals[current];
      return previous;
    }, 0);
    console.log('total_output', total_output);
    this.speed = Math.floor(this.duration / total_output);

    this.counttoService.register(this.id, () => {
      this.start(this.totals.digits, this.speed, '',
        this.totals.thousands ? () => { this.start(this.totals.thousands, this.speed, 'K',
          this.totals.millions ? () => { this.start(this.totals.millions, this.speed, 'M',
            this.totals.billions ? () => { this.start(this.totals.billions, this.speed, 'B',
              this.totals.trillions ? () => { this.start(this.totals.trillions, this.speed, 'T',
                null
                );
              } : null
              );
            } : null
            );
          } : null
          );
        } : null
      );
    });
  }

  ngOnDestroy() {
    // this.counttoService.state.unsubscribe();
  }

  private start(take, speed, postfix = '', next = null, delay = 0) {
    console.log('take-speed-delay', take, speed, delay);
    Rx.Observable
      .timer(delay, speed)
      .take(take + 1)
      .map(val => val + postfix)
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
