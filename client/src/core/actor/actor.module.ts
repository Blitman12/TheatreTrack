import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ActorSideBarComponent } from './components/actor-side-bar/actor-side-bar.component';
import { ActorComponent } from './components/actor/actor.component';

@NgModule({
  declarations: [
    ActorSideBarComponent,
    ActorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [ActorSideBarComponent]
})
export class ActorModule { }
