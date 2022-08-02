import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ActorMainComponent } from './components/actor/actor-main.component';
import { ActorAddComponent } from './components/actor-add/actor-add.component';
import { ActorEditComponent } from './components/actor-edit/actor-edit.component';



@NgModule({
  declarations: [
    ActorMainComponent,
    ActorAddComponent,
    ActorEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ActorMainComponent]
})
export class ActorModule { }