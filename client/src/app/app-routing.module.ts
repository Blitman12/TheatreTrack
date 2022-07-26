import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectInfoComponent } from 'src/core/project/components/project-info/project-info.component';
import { ProjectLandingComponent } from 'src/core/project/components/project-landing/project-landing.component';

const routes: Routes = [
  {path: '', component: ProjectLandingComponent},
  {path: 'project/:id', component: ProjectInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
