import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './project.service';
import { StoreModule } from '@ngrx/store';
import { fromProjects } from './state';
import { EffectsModule } from '@ngrx/effects';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/shared/shared.module';
import { ProjectLandingComponent } from './components/project-landing/project-landing.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectComponent } from './components/project/project.component';
import { ActEffects } from './state/effects/act.effects';
import { ActorEffects } from './state/effects/actor.effects';
import { SceneEffects } from './state/effects/scene.effects';
import { ProjectEffects } from './state/effects/project.effects';

@NgModule({
  declarations: [
    ProjectLandingComponent,
    ProjectCardComponent,
    ProjectComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    StoreModule.forFeature(fromProjects.featureName, fromProjects.reducer),
    EffectsModule.forFeature([
      ProjectEffects,
      ActEffects,
      ActorEffects,
      SceneEffects,
    ]),
    SharedModule,
  ],
  providers: [ProjectService],
  exports: [],
})
export class ProjectModule {}
