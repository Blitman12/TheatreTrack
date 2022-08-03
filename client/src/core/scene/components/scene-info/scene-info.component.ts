import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import * as XLSX from 'xlsx';

import { 
  Act,
  Actor, 
  Project, 
  Scene 
} from 'src/shared/models';
import { BaseComponent } from 'src/shared/bases/base.component';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { sceneActions } from 'src/core/project/state';

@Component({
  selector: 'app-scene-info',
  templateUrl: './scene-info.component.html',
  styleUrls: ['./scene-info.component.scss']
})
export class SceneInfoComponent extends BaseComponent implements OnInit {
  @ViewChild('excelTable') 
  public excelTable?: ElementRef;
  public selectedProject?: Project;
  public selectedProjectId = '';
  public selectedAct?: Act;
  public selectedActId = '';
  public selectedScene?: Scene;
  public selectedSceneId = '';

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
    if (confirm) this._store.dispatch(sceneActions.requestPullActorToScene({sceneId: this.selectedSceneId, actorId: actor._id}))
  }

  public drop(event: CdkDragDrop<string[]>): void {
    this._store.dispatch(sceneActions.requestPushActorToScene({sceneId: this.selectedSceneId, actorId: event.item.data._id}))
  }

  public print(): void {
    try {
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.excelTable?.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `${this.selectedProject?.name}-${this.selectedAct?.name}-${this.selectedScene?.name}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  }

  // private createData(): void {
  //   const sceneArr = Object.entries(this.selectedScene!)
  //   console.log(sceneArr)
  //   const sceneStr = sceneArr.join(',')
  //   console.log(sceneStr)
  // }

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
