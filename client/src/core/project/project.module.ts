import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './project.service';
import { StoreModule } from '@ngrx/store';
import { fromProjects } from './state';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/effects';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { SharedModule } from 'src/shared/shared.module';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { ProjectLandingComponent } from './components/project-landing/project-landing.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectSetupComponent } from './components/project-setup/project-setup.component';
import { ProjectActorComponent } from './components/project-actor/project-actor.component';
import { ProjectAddActorComponent } from './components/project-add-actor/project-add-actor.component';
import { ProjectEditActorComponent } from './components/project-edit-actor/project-edit-actor.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectAddSceneComponent } from './components/project-add-scene/project-add-scene.component';




@NgModule({
  declarations: [
    ProjectAddComponent,
    ProjectLandingComponent,
    ProjectInfoComponent,
    ProjectCardComponent,
    ProjectSetupComponent,
    ProjectActorComponent,
    ProjectAddActorComponent,
    ProjectEditActorComponent,
    ProjectEditComponent,
    ProjectAddSceneComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProjects.featureName, fromProjects.reducer),
    EffectsModule.forFeature([ProjectEffects]),
    SharedModule
  ],
  providers: [ProjectService],
  exports: [ProjectActorComponent]
})
export class ProjectModule { }
