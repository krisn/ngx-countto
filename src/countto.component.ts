import { Component, Input, Output, EventEmitter, AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
import { CountToService } from './countto.service';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'ngx-countto',
  template: `
    {{output}}
  `
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
    console.log('com from', this.from);

    this.counttoService.register(this.id, () => {
      this.start(this);
    });
  }

  ngOnDestroy() {
    // this.counttoService.state.unsubscribe();
  }

  private start(scope) {
    console.log('com', scope.to, scope.progress);
    Rx.Observable
      .interval(scope.speed)
      .take(scope.to + 1)
      .map(scope.inc)
      .subscribe(val => {
        scope.output = val;
        console.log(scope.output);
      });
  }

  private inc(val) {
    val = val > 10 ? val + '' : val;
    return val;
  }

  isStarted(): boolean {
    return this.progress > 0 && this.progress < this.to;
  }
}
