# ngx-countto

Angular 2+ component that counts up to a specified number. And accompanying service to trigger the action at a desired time or event. Supports multiple components and different starting times.

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
<ngx-countto [to]=10></ngx-countto>
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
**from** | *number* | `0` | Starting number
**to** | *number* | `from + 10` | Ending number 
**duration** | *number* | `?` | Not yet supported


## Examples

```html
<ngx-countto [from]=1 [to]=10></ngx-countto>
<ngx-countto [id]="'countto_01'" [to]=100></ngx-countto>
```

## License

MIT © [Kris Nyunt](mailto:kris.nyunt@gmail.com)
