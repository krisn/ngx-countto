import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountToComponent } from './countto.component';
import { CountToService } from './countto.service';

export * from './countto.component';
export * from './countto.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CountToComponent
  ],
  exports: [
    CountToComponent
  ]
})
export class CountToModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CountToModule,
      providers: [CountToService]
    };
  }
}
