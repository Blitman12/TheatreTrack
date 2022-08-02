import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { 
  Act, 
  Project, 
  Scene 
} from 'src/shared/models';
import { ActComponent } from 'src/core/act/components/act/act.component';
import { BaseComponent } from 'src/shared/bases/base.component';
import { SceneComponent } from 'src/core/scene/components/scene/scene.component';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { actActions, projectActions, sceneActions } from 'src/core/project/state';
import { ProjectComponent } from 'src/core/project/components/project/project.component';

@Component({
  selector: 'app-act-info',
  templateUrl: './act-info.component.html',
  styleUrls: ['./act-info.component.scss']
})
export class ActInfoComponent extends BaseComponent implements OnInit {
  public selectedProject?: Project;
  private _id = '';

  public constructor(
    private _projectSelector: ProjectSelectors,
    private _router: Router,
    private _dialog: MatDialog,
    private _store: Store
  ) {
    super();
  }

  public ngOnInit(): void {
    this._id = this._router.parseUrl(this._router.url).root.children['primary'].segments[1].path;
    this.setupSubscriptions();
  }

  public deleteProject(): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this play? The Action cannot be undone')
    if (!confirmDelete) {
      return
    }
    this._store.dispatch(projectActions.requestDeleteProject({ id: this._id }))
    this._router.navigateByUrl('/')
  }

  public editProject(): void {
    this._dialog.open(ProjectComponent, { data: { project: this.selectedProject } })
  }
  
  public editAct(projectId: string, act?: Act): void {
    this._dialog.open(ActComponent, { data: { projectId, act } });
  }

  public deleteAct(act: Act): void {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${act.name}? There is no going back`);
    if (confirmDelete) this._store.dispatch(actActions.requestDeleteAct({ id: act._id }));
  }

  public deleteScene(scene: Scene): void {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${scene.name}? There is no going back`);
    if (confirmDelete) this._store.dispatch(sceneActions.requestDeleteScene({ id: scene._id }));
  }

  public editScene(actId: string, scene?: Scene): void {
    this._dialog.open(SceneComponent, { data: { actId, scene } })
  }
  
  public goToScene(project: Project, act: Act, scene: Scene): void {
    this._router.navigateByUrl(`project/${project._id}/act/${act._id}/scene/${scene._id}`)
  }

  private setupSubscriptions(): void {
    this._subscriptions.push(
      this._projectSelector.projectInfo$.subscribe(projects => this.loadProject(projects))
    )
  }

  private loadProject(projects: Project[]): void {
    this.selectedProject = projects.find(p => p._id === this._id)
  }
}
