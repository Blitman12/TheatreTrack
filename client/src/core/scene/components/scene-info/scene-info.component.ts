import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

import { Act, Actor, Project, Scene } from 'src/shared/models';
import { BaseComponent } from 'src/shared/bases/base.component';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { sceneActions } from 'src/core/project/state';
import { MatTable } from '@angular/material/table';
import { SceneComponent } from '../scene/scene.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-scene-info',
  templateUrl: './scene-info.component.html',
  styleUrls: ['./scene-info.component.scss'],
})
export class SceneInfoComponent extends BaseComponent {
  @ViewChild('table')
  public table!: MatTable<any>;

  public displayedColumns = ['name', 'character', 'delete'];
  public dataSource = new Array<{
    name: string;
    character: string;
    actor: Actor;
  }>();
  public selectedProject?: Project;
  public selectedProjectId = '';
  public selectedAct?: Act;
  public selectedActId = '';
  public selectedScene?: Scene;
  public selectedSceneId = '';

  public constructor(
    private _router: Router,
    private _projectSelector: ProjectSelectors,
    private _dialog: MatDialog,
    private _store: Store
  ) {
    super();
    this.selectedProjectId = this._router.parseUrl(
      this._router.url
    ).root.children['primary'].segments[1].path;
    this.selectedActId = this._router.parseUrl(this._router.url).root.children[
      'primary'
    ].segments[3].path;
    this.selectedSceneId = this._router.parseUrl(
      this._router.url
    ).root.children['primary'].segments[5].path;
    this.setupSubscriptions();
  }

  public remove(actor: Actor): void {
    const confirm = window.confirm(
      `Remove ${actor.firstName} From This Scene?`
    );
    if (confirm)
      this._store.dispatch(
        sceneActions.requestPullActorToScene({
          sceneId: this.selectedSceneId,
          actorId: actor._id,
        })
      );
  }

  public drop(event: CdkDragDrop<string[]>): void {
    this._store.dispatch(
      sceneActions.requestPushActorToScene({
        sceneId: this.selectedSceneId,
        actorId: event.item.data._id,
      })
    );
  }

  public print(): void {
    try {
      const data = this.selectedScene?.actors.map((actor) => {
        return {
          name: `${actor.firstName} ${actor.lastName}`,
          currentCharacter: actor.currentCharacter,
        };
      });
      new AngularCsv(
        data,
        `${this.selectedProject?.name}-${this.selectedAct?.name}-${this.selectedScene?.name}`,
        {
          headers: [
            'Name',
            'Current Character',
            `Number of Actors: ${this.selectedScene?.actors.length}`,
          ],
        }
      );
    } catch (error) {
      console.log(error);
      window.alert(
        'Something terrible has happened.... please seek the keymaster'
      );
    }
  }

  public editScene(actId: string, scene?: Scene): void {
    this._dialog.open(SceneComponent, { data: { actId, scene } });
  }

  private setupSubscriptions(): void {
    this._subscriptions.push(
      this._projectSelector.projectInfo$.subscribe((projects) =>
        this.loadProject(projects)
      )
    );
  }

  private loadProject(projects: Project[]): void {
    this.selectedProject = projects.find(
      (p) => p._id === this.selectedProjectId
    );
    this.selectedAct = this.selectedProject?.acts?.find(
      (p) => p._id === this.selectedActId
    );
    this.selectedScene = this.selectedAct?.scenes?.find(
      (p) => p._id === this.selectedSceneId
    );
    this.handleDataSource();
  }

  private handleDataSource(): void {
    this.dataSource = [];
    this.selectedScene?.actors.forEach((actor) => {
      this.dataSource.push({
        name: `${actor.firstName} ${actor.lastName}`,
        character: actor.currentCharacter,
        actor: actor,
      });
    });
    this.table?.renderRows();
  }
}
