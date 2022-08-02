import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ActAddComponent } from './components/act-add/act-add.component';
import { ActAddSceneComponent } from './components/act-add-scene/act-add-scene.component';
import { ActEditComponent } from './components/act-edit/act-edit.component';



@NgModule({
  declarations: [
    ActAddComponent,
    ActAddSceneComponent,
    ActEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ActModule { }
