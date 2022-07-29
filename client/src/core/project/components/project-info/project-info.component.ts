import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/shared/bases/base.component';
import { Project } from 'src/shared/models';
import { projectActions } from '../../state';
import { ProjectSelectors } from '../../state/selectors';
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

  public edit(): void {
    this._dialog.open(ProjectEditComponent, { data: { project: this.selectedProject } })
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
