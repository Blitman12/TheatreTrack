import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActInfoComponent } from 'src/core/act/components/act-info/act-info.component';
import { ProjectLandingComponent } from 'src/core/project/components/project-landing/project-landing.component';
import { SceneInfoComponent } from 'src/core/scene/components/scene-info/scene-info.component';

const routes: Routes = [
  {path: '', component: ProjectLandingComponent},
  {path: 'act/:id', component: ActInfoComponent},
  {path: 'project/:id/act/:id/scene/:id', component: SceneInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
