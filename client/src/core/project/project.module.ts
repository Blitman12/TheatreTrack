import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './project.service';
import { StoreModule } from '@ngrx/store';
import { fromProjects } from './state';
import { EffectsModule } from '@ngrx/effects';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectEffects } from './state/effects';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { SharedModule } from 'src/shared/shared.module';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { ProjectLandingComponent } from './components/project-landing/project-landing.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectSetupComponent } from './components/project-setup/project-setup.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectEditSceneComponent } from './components/project-edit-scene/project-edit-scene.component';
import { ProjectSceneInfoComponent } from './components/project-scene-info/project-scene-info.component';




@NgModule({
  declarations: [
    ProjectAddComponent,
    ProjectLandingComponent,
    ProjectInfoComponent,
    ProjectCardComponent,
    ProjectSetupComponent,
    ProjectEditComponent,
    ProjectEditSceneComponent,
    ProjectSceneInfoComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    StoreModule.forFeature(fromProjects.featureName, fromProjects.reducer),
    EffectsModule.forFeature([ProjectEffects]),
    SharedModule
  ],
  providers: [ProjectService],
  exports: []
})
export class ProjectModule { }
