import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { BaseComponent } from 'src/shared/bases/base.component';
import { Act, Actor, Project, Scene } from 'src/shared/models';
import { Store } from '@ngrx/store';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { projectActions } from 'src/core/project/state';

@Component({
  selector: 'app-act-scene-info',
  templateUrl: './act-scene-info.component.html',
  styleUrls: ['./act-scene-info.component.scss']
})
export class ActSceneInfoComponent extends BaseComponent implements OnInit {
  public selectedProject?: Project;
  public selectedProjectId = '';
  public selectedAct?: Act;
  public selectedActId = '';
  public selectedScene?: Scene;
  public selectedSceneId = '';
  public tests = [{name: 'brad'}, {name: 'shane'}]

  public constructor(
    private _router: Router,
    private _projectSelector: ProjectSelectors,
    private _store: Store
  )
  { 
    super();
  }

  public ngOnInit(): void {
    this.selectedProjectId = this._router.parseUrl(this._router.url).root.children['primary'].segments[1].path;
    this.selectedActId = this._router.parseUrl(this._router.url).root.children['primary'].segments[3].path;
    this.selectedSceneId = this._router.parseUrl(this._router.url).root.children['primary'].segments[5].path;
    this._setupSubscriptions();
  }


  public remove(actor: Actor): void {
    const confirm = window.confirm(`Remove ${actor.firstName} From This Scene?`)
    if (confirm) this._store.dispatch(projectActions.requestPullActorToScene({sceneId: this.selectedSceneId, actorId: actor._id}))
  }

  public drop(event: CdkDragDrop<string[]>): void {
    this._store.dispatch(projectActions.requestPushActorToScene({sceneId: this.selectedSceneId, actorId: event.item.data._id}))
  }

  private _setupSubscriptions(): void {
    this._subscriptions.push(
      this._projectSelector.projectInfo$.subscribe(projects => this.loadProject(projects))
    )
  }

  private loadProject(projects: Project[]): void {
    this.selectedProject = projects.find(p => p._id === this.selectedProjectId);
    this.selectedAct = this.selectedProject?.acts?.find(p => p._id === this.selectedActId);
    this.selectedScene = this.selectedAct?.scenes?.find(p => p._id === this.selectedSceneId);
  }
}
