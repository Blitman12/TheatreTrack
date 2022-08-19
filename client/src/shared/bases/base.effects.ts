import { of } from 'rxjs';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  actActions,
  actorActions,
  projectActions,
  sceneActions,
} from 'src/core/project/state';

export abstract class BaseEffects {
  private _snackBar = inject(MatSnackBar);
  public constructor() {}

  protected handleResponse(response: any, action: any, errorMsg: string) {
    if (response) {
      switch (action.type) {
        case projectActions.addProjectSuccess.type:
        case projectActions.deleteProjectSuccess.type:
        case projectActions.editProjectSuccess.type:
        case actorActions.addActorSuccess.type:
        case actorActions.deleteActorSuccess.type:
        case actorActions.editActorSuccess.type:
        case sceneActions.addPullActorToSceneSuccess.type:
        case sceneActions.addPushActorToSceneSuccess.type:
        case sceneActions.addSceneSuccess.type:
        case sceneActions.editSceneSuccess.type:
        case sceneActions.deleteSceneSuccess.type:
        case actActions.addActSuccess.type:
        case actActions.editActSuccess.type:
        case actActions.deleteActSuccess.type:
          this._snackBar.open('Success', 'Action', { duration: 2000 });
          break;
      }
      return action;
    } else {
      throw new Error(errorMsg);
    }
  }

  protected handleFailure(error: any, action: any) {
    console.log('Something strange in handleFailure', error);
    return of(action);
  }
}
