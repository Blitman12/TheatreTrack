import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/shared/models';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input()
  public project!: Project;
  public defaultImage = '/assets/images/defaultMusical.jpg';

  public get actors(): string {
    return this.project && this.project.actors && this.project.actors.length > 0
      ? this.project.actors
          .map((actor) => `${actor.firstName} ${actor.lastName}`)
          .join(', ')
      : 'No Actors';
  }

  public constructor(private _dialog: MatDialog, private _router: Router) {}

  public editProject(): void {
    this._dialog.open(ProjectComponent, { data: { project: this.project } });
  }

  public handleProject(id: string): void {
    this._router.navigateByUrl(`act/${id}`);
  }
}
