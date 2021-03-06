# ngx-countto

Angular 2+ component that counts up to a specified number. And accompanying service to trigger the action at a desired time or event. Supports multiple instances and different starting times.

[Preview in Plunker](https://plnkr.co/4ixQIdmUN0xsozODyDmw)

[![npm version](https://badge.fury.io/js/ngx-countto.svg)](https://badge.fury.io/js/ngx-countto)
[![license](https://img.shields.io/npm/l/ngx-countto.svg)](https://www.npmjs.com/package/ngx-countto)


## Installation

[![NPM](https://nodei.co/npm/ngx-countto.png?downloads=true&stars=true)](https://nodei.co/npm/ngx-countto/)

To install this library, run:

```bash
$ npm install ngx-countto --save
```

## Usage

Add the component in your Angular application's template:

```html
<!-- You can now use your library component in app.component.html -->
<h1>{{title}}</h1>
<ngx-countto [to]=100></ngx-countto>
```

And in your Angular `AppModule`, import the library then trigger the counting by calling `CountToService`'s function `start()` anywhere from your application logic:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the library
import { CountToModule, CountToService } from 'ngx-countto';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    // Specify the library as an import
    CountToModule
  ],
  providers: [ CountToService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

@Component()
class AppComponent implements OnInit {
  // Inject the service into your component
  constructor(private counttoService: CountToService) {}
  ngOnInit() {
    // Start the counting via the service
    this.counttoService.start();
  }
}
```


## Parameters

Parameter | Type | Default | Description 
--- | --- | --- | ---
**id** | *string* | `countto` | Element ID of the component. For multi-component support
**from** | *number* | `0` | Starting number (Not yet supported)
**to** | *number* | `from + 10` | Ending number 
**duration** | *number* | `?` | Duration (Not yet supported)


## Examples

```html
<ngx-countto [from]=1 [to]=100></ngx-countto>
<ngx-countto [id]="'countto_01'" [to]=18000></ngx-countto>
```

```typescript
class AppComponent implements OnInit {

  constructor(private counttoService: CountToService) {}
  ngOnInit() {
    this.counttoService.start();

    setTimeout(() => {
      this.counttoService.start('countto_01');
    }, 2000);
  }
}
```


## License

MIT © [Kris Nyunt](mailto:kris.nyunt@gmail.com)
