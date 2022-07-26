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




@NgModule({
  declarations: [
    ProjectAddComponent,
    ProjectLandingComponent,
    ProjectInfoComponent,
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProjects.featureName, fromProjects.reducer),
    EffectsModule.forFeature([ProjectEffects]),
    SharedModule
  ],
  providers: [ProjectService]
})
export class ProjectModule { }