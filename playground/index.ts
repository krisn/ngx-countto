/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CountToModule, CountToService } from '../dist/ngx-countto.umd.js';

@Component({
  selector: 'app',
  template: `To: <ngx-countto [begin]="0"></ngx-countto>`
})
class AppComponent implements OnInit {

  constructor(private counttoService: CountToService) {}

  ngOnInit() {
    this.counttoService.start();

    const t = setTimeout(() => {
      this.counttoService.done();
    }, 3000);
  }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, CountToModule ],
  providers: [
    CountToService
  ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
