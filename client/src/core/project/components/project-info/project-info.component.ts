import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/shared/bases/base.component';
import { Act, Project, Scene } from 'src/shared/models';
import { projectActions } from '../../state';
import { ProjectSelectors } from '../../state/selectors';
import { ProjectAddNewActComponent } from '../project-add-act/project-add-act-new.component';
import { ProjectAddSceneComponent } from '../project-add-scene/project-add-scene.component';
import { ProjectEditActComponent } from '../project-edit-act/project-edit-act.component';
import { ProjectEditSceneComponent } from '../project-edit-scene/project-edit-scene.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectSetupComponent } from '../project-setup/project-setup.component';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent extends BaseComponent implements OnInit {
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

  public getStarted(): void {
    this._dialog.open(ProjectSetupComponent, { data: { project: this.selectedProject } })
  }

  public editProject(): void {
    this._dialog.open(ProjectEditComponent, { data: { project: this.selectedProject } })
  }
  
  public addAct(): void {
    this._dialog.open(ProjectAddNewActComponent, { data: { project: this.selectedProject } })
  }

  public editAct(act: Act): void {
    this._dialog.open(ProjectEditActComponent, { data: { act } });
  }

  public deleteAct(act: Act): void {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${act.name}? There is no going back`);
    if (confirmDelete) this._store.dispatch(projectActions.requestDeleteAct({ id: act._id }));
  }

  public deleteScene(scene: Scene): void {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${scene.name}? There is no going back`);
    if (confirmDelete) this._store.dispatch(projectActions.requestDeleteScene({ id: scene._id }));
  }

  public editScene(scene: Scene): void {
    this._dialog.open(ProjectEditSceneComponent, { data: { scene } })
  }

  public addScene(id: string): void {
    this._dialog.open(ProjectAddSceneComponent, { data: { id: id } })
  }
  
  public goToScene(act: Act, scene: Scene): void {
    this._router.navigateByUrl(`act/${act._id}/scene/${scene._id}`)
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
