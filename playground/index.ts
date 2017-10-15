/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CountToModule, CountToService } from '../dist/ngx-countto.umd.js';

@Component({
  selector: 'app-root',
  template: `
    <ngx-countto [to]="20">10</ngx-countto> || <ngx-countto [id]="'ctid'" [from]=990 [to]="1010"></ngx-countto>
  `
})
class AppComponent implements OnInit {

  constructor(private counttoService: CountToService) {}

  ngOnInit() {
    this.counttoService.start();

    const t = setTimeout(() => {
      this.counttoService.start('ctid');
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
