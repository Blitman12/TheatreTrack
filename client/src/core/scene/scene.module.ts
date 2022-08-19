import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { SceneInfoComponent } from './components/scene-info/scene-info.component';
import { SceneComponent } from './components/scene/scene.component';

@NgModule({
  declarations: [SceneInfoComponent, SceneComponent],
  imports: [CommonModule, SharedModule],
})
export class SceneModule {}
