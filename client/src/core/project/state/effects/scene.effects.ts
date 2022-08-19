import { catchError, switchMap, map, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { ProjectService } from '../../project.service';
import { sceneActions } from '..';
import { ErrorModalComponent } from 'src/shared/error-modal/error-modal.component';
import { BaseEffects } from 'src/shared/bases';

@Injectable({ providedIn: 'root' })
export class SceneEffects extends BaseEffects {
  requestPushActorToScene$ = createEffect(() =>
    this._actions$.pipe(
      ofType(sceneActions.requestPushActorToScene),
      switchMap((action) =>
        this._projectService
          .pushActorToScene(action.sceneId, action.actorId)
          .pipe(
            map((res) =>
              this.handleResponse(
                res,
                sceneActions.addPushActorToSceneSuccess(),
                'Something went wrong'
              )
            ),
            catchError((error) =>
              this.handleFailure(
                error,
                sceneActions.addPushActorToSceneFailure()
              )
            )
          )
      )
    )
  );

  requestPullActorToScene$ = createEffect(() =>
    this._actions$.pipe(
      ofType(sceneActions.requestPullActorToScene),
      switchMap((action) =>
        this._projectService
          .pullActorToScene(action.sceneId, action.actorId)
          .pipe(
            map((res) =>
              this.handleResponse(
                res,
                sceneActions.addPullActorToSceneSuccess(),
                'Something went wrong'
              )
            ),
            catchError((error) =>
              this.handleFailure(
                error,
                sceneActions.addPullActorToSceneFailure()
              )
            )
          )
      )
    )
  );

  requestAddScene$ = createEffect(() =>
    this._actions$.pipe(
      ofType(sceneActions.requestAddScene),
      switchMap((action) =>
        this._projectService.addScene(action.actId, action.name).pipe(
          map((res) =>
            this.handleResponse(
              res,
              sceneActions.addSceneSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, sceneActions.addSceneFailure())
          )
        )
      )
    )
  );

  requestEditScene$ = createEffect(() =>
    this._actions$.pipe(
      ofType(sceneActions.requestEditScene),
      switchMap((action) =>
        this._projectService.editScene(action.id, action.name).pipe(
          map((res) =>
            this.handleResponse(
              res,
              sceneActions.editSceneSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, sceneActions.editSceneFailure())
          )
        )
      )
    )
  );

  requestDeleteScene$ = createEffect(() =>
    this._actions$.pipe(
      ofType(sceneActions.requestDeleteScene),
      switchMap((action) =>
        this._projectService.deleteScene(action.id).pipe(
          map((res) =>
            this.handleResponse(
              res,
              sceneActions.deleteSceneSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, sceneActions.deleteSceneFailure())
          )
        )
      )
    )
  );

  listenToErrors$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          sceneActions.addSceneFailure,
          sceneActions.deleteSceneFailure,
          sceneActions.editSceneFailure,
          sceneActions.addPullActorToSceneFailure,
          sceneActions.addPushActorToSceneFailure
        ),
        tap(() => this._dialog.open(ErrorModalComponent))
      ),
    { dispatch: false }
  );

  public constructor(
    private _store: Store,
    private _actions$: Actions,
    private _projectService: ProjectService,
    private _dialog: MatDialog
  ) {
    super();
  }
}
