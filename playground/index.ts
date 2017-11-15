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
  <div>
    <h2>{{name}}</h2>
    <ngx-countto [to]="100"></ngx-countto><br/>
    <ngx-countto [id]="'ctid2'" [from]=0 [to]="3050" class="ctid2"></ngx-countto><br/> 
    <ngx-countto [id]="'ctid1'" [to]="18000000" class="ctid1"></ngx-countto>
  </div>
  `,
  styles: [`
    .ctid1 { color: red; font-size: 32px; }
    .ctid2 { color: blue; font-size: 24px; }
  `]
})
class AppComponent implements OnInit {

  constructor(private counttoService: CountToService) {}

  ngOnInit() {
    // starts every counter without an id
    // this.counttoService.start();

    // starts 'ctid1'
    this.counttoService.start('ctid1');

    // delayed start for 'ctid2'
    const t = setTimeout(() => {
      this.counttoService.start('ctid2');
    }, 5000);
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
