import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ActComponent } from './components/act/act.component';
import { ActInfoComponent } from './components/act-info/act-info.component';




@NgModule({
  declarations: [
    ActComponent,
    ActInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ActModule { }
