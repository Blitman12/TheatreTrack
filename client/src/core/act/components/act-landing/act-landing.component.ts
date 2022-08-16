import { 
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { 
  Act, 
  Project, 
  Scene 
} from 'src/shared/models';
import {  projectActions } from 'src/core/project/state';
import { ActComponent } from 'src/core/act/components/act/act.component';
import { BaseComponent } from 'src/shared/bases/base.component';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { ProjectComponent } from 'src/core/project/components/project/project.component';

@Component({
  selector: 'app-act-landing',
  templateUrl: './act-landing.component.html',
  styleUrls: ['./act-landing.component.scss']
})
export class ActLandingComponent extends BaseComponent implements OnInit {
  @ViewChild('printButton')
  public printButton?: HTMLAnchorElement;
  public selectedProject?: Project;

  private _id = '';
  private result = '';
  private csvHeader = 'Act,Scene,Actor,Character,Actor Count\r\n';

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

  public printCSV(act?: Act): void {
    const func = act ? () => this.actToCSV(act) : () => this.selectedProject?.acts.map(act => this.actToCSV(act));
    this.print(func);
  }

  public editAct(projectId: string, act?: Act): void {
    this._dialog.open(ActComponent, { data: { projectId, act } });
  }

  private print(func: () => void): void {
    this.result = this.csvHeader;
    try {
      func();
      const blob = new Blob([this.result], {type: 'text/csv'})
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_self')
    } catch (error) {
      console.log(error)
    }
  }

  private actToCSV(act: Act): void {
    for (let i = 0; i < act.scenes.length; i++) {
      // Not duplicate code - This deals with not duplicating per act
      const actName = i === 0 ? act.name : ''
      this.sceneToCSV(actName, act.scenes[i])
    }
  }

  private sceneToCSV(actName: string, scene: Scene): void{
      for (let i = 0; i < scene.actors.length; i++) {
        const actor = scene.actors[i];
        const sceneName = i === 0 ? scene.name : '';
        // Not duplicate code - this deals with not duplicating in scene
        const act = i === 0 ? actName : ''
        const actorNum = i === 0 ? scene.actors.length.toString() : ''
        this.result += `${act}, ${sceneName}, ${actor.firstName} ${actor.lastName}, ${actor.currentCharacter}, ${actorNum}\r\n`
      }
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
