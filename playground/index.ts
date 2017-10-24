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
    <ngx-countto [to]="200"></ngx-countto> || 
    <ngx-countto [id]="'ctid'" [from]=990 [to]="1010"></ngx-countto> || 
    <ngx-countto [id]="'c2id'" [to]="5000000"></ngx-countto>
  `
})
class AppComponent implements OnInit {

  constructor(private counttoService: CountToService) {}

  ngOnInit() {
    // this.counttoService.start();
    this.counttoService.start('c2id');

    const t = setTimeout(() => {
      // this.counttoService.start('ctid');
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
