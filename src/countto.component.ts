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
  @Input() duration;

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
    // this.output = this.format(0, this.from);
    this.counttoService.register(this.id, () => {
      this.start();
    });
  }

  ngOnDestroy() {
    // this.counttoService.state.unsubscribe();
  }

  private start() {
    Rx.Observable
      .interval(this.speed)
      .take(this.to - this.from)
      .subscribe(val => {
        this.progress = val + this.from;
        this.output = val + this.from;
        this.output = this.output > 1000 ? (this.output / 1000).toFixed(3) + 'K' : this.output;
        // console.log(this.output);
      });
  }

  isStarted(): boolean {
    return this.progress > 0 && this.progress < this.to;
  }
}
