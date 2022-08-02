import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ActAddComponent } from './components/act-add/act-add.component';
import { ActAddSceneComponent } from './components/act-add-scene/act-add-scene.component';
import { ActEditComponent } from './components/act-edit/act-edit.component';
import { ActEditSceneComponent } from './components/act-edit-scene/act-edit-scene.component';
import { ActSceneInfoComponent } from './components/act-scene-info/act-scene-info.component';



@NgModule({
  declarations: [
    ActAddComponent,
    ActAddSceneComponent,
    ActEditComponent,
    ActEditSceneComponent,
    ActSceneInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ActModule { }
