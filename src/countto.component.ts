import { Component, Input, Output, EventEmitter, AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { CountToService } from './countto.service';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'ngx-countto',
  template: `{{output}}`
})
export class CountToComponent implements OnDestroy, AfterContentInit {

  @Input() id = 'countto';
  @Input() to: number;
  @Input() ease;
  @Input() duration;

  @Output() onFinish: EventEmitter<any>;

  state: any;
  progress: number;
  output: any;
  from: number;
  speed = 100;

  constructor(private counttoService: CountToService,
              private elementRef: ElementRef) {
    // this.state = counttoService.state;
  }

  ngAfterContentInit() {
    this.from = this.elementRef.nativeElement.innerText || 0;
    this.progress = this.from;
    this.output = this.format(this.from);
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
      .take(this.to + 1)
      .map(this.format)
      .subscribe(val => {
        this.output = val;
        // console.log(this.output);
      });
  }

  private format(val) {
    this.progress = val;
    val = val > 10 ? val + '' : val;
    return val;
  }

  isStarted(): boolean {
    return this.progress > 0 && this.progress < this.to;
  }
}
