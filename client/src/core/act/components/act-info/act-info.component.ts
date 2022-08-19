import { Component, Input } from '@angular/core';

import { Act, Project, Scene } from 'src/shared/models';
import { BaseComponent } from 'src/shared/bases/base.component';
import { Store } from '@ngrx/store';
import { actActions, sceneActions } from 'src/core/project/state';
import { SceneComponent } from 'src/core/scene/components/scene/scene.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActComponent } from '../act/act.component';

@Component({
  selector: 'app-act-info',
  templateUrl: './act-info.component.html',
  styleUrls: ['./act-info.component.scss'],
})
export class ActInfoComponent extends BaseComponent {
  @Input()
  public act!: Act;
  @Input()
  public selectedProject!: Project;

  private result = '';
  private csvHeader = 'Act,Scene,Actor,Character,Actor Count\r\n';

  public constructor(
    private _store: Store,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    super();
  }

  public deleteScene(scene: Scene): void {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${scene.name}? There is no going back`
    );
    if (confirmDelete)
      this._store.dispatch(sceneActions.requestDeleteScene({ id: scene._id }));
  }

  public editScene(actId: string, scene?: Scene): void {
    this._dialog.open(SceneComponent, { data: { actId, scene } });
  }

  public goToScene(project: Project, act: Act, scene: Scene): void {
    this._router.navigateByUrl(
      `project/${project._id}/act/${act._id}/scene/${scene._id}`
    );
  }

  public editAct(projectId: string, act?: Act): void {
    this._dialog.open(ActComponent, { data: { projectId, act } });
  }

  public deleteAct(act: Act): void {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${act.name}? There is no going back`
    );
    if (confirmDelete)
      this._store.dispatch(actActions.requestDeleteAct({ id: act._id }));
  }

  public printCSV(act?: Act): void {
    const func = act
      ? () => this.actToCSV(act)
      : () => this.selectedProject?.acts.map((act) => this.actToCSV(act));
    this.print(func);
  }

  private print(func: () => void): void {
    this.result = this.csvHeader;
    try {
      func();
      const blob = new Blob([this.result], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_self');
    } catch (error) {
      console.log(error);
    }
  }

  private actToCSV(act: Act): void {
    for (let i = 0; i < act.scenes.length; i++) {
      // Not duplicate code - This deals with not duplicating per act
      const actName = i === 0 ? act.name : '';
      this.sceneToCSV(actName, act.scenes[i]);
    }
  }

  private sceneToCSV(actName: string, scene: Scene): void {
    for (let i = 0; i < scene.actors.length; i++) {
      const actor = scene.actors[i];
      const sceneName = i === 0 ? scene.name : '';
      // Not duplicate code - this deals with not duplicating in scene
      const act = i === 0 ? actName : '';
      const actorNum = i === 0 ? scene.actors.length.toString() : '';
      this.result += `${act}, ${sceneName}, ${actor.firstName} ${actor.lastName}, ${actor.currentCharacter}, ${actorNum}\r\n`;
    }
  }
}
