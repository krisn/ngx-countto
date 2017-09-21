import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CountToService } from './countto.service';

@Component({
  selector: 'ngx-countto',
  template: `{{state.value}}`
})
export class CountToComponent implements OnDestroy {

  @Input() begin;
  @Input() end;
  @Input() ease;
  @Input() duration;

  @Output() onFinish: EventEmitter<any>;

  public state: any;

  constructor(public counttoService: CountToService) {
    this.state = counttoService.state;
  }

  ngOnDestroy() {
    this.counttoService.state.unsubscribe();
    this.counttoService.trickling.unsubscribe();
  }
}
