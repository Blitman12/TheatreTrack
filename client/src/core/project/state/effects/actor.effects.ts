import { catchError, switchMap, map, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { actorActions } from '..';
import { ProjectService } from '../../project.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseEffects } from 'src/shared/bases';
import { ErrorModalComponent } from 'src/shared/error-modal/error-modal.component';

@Injectable({ providedIn: 'root' })
export class ActorEffects extends BaseEffects {
  requestActors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        actorActions.requestLoadActors,
        actorActions.addActorSuccess,
        actorActions.deleteActorSuccess,
        actorActions.editActorSuccess
      ),
      switchMap(() =>
        this._projectService.getActors().pipe(
          map((actors) =>
            this.handleResponse(
              actors,
              actorActions.loadActorsSuccess({ actors }),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, actorActions.loadActorsFailure())
          )
        )
      )
    )
  );

  requestAddActor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actorActions.requestAddActor),
      switchMap((action) =>
        this._projectService
          .addActor(
            action.firstName,
            action.lastName,
            action.age,
            action?.currentCharacter
          )
          .pipe(
            map((res) =>
              this.handleResponse(
                res,
                actorActions.addActorSuccess(),
                'Something went wrong'
              )
            ),
            catchError((error) =>
              this.handleFailure(error, actorActions.addActorFailure())
            )
          )
      )
    )
  );

  requestEditActor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actorActions.requestEditActor),
      switchMap((action) =>
        this._projectService
          .editActor(
            action.id,
            action?.firstName,
            action?.lastName,
            action?.age,
            action?.currentCharacter
          )
          .pipe(
            map((res) =>
              this.handleResponse(
                res,
                actorActions.editActorSuccess(),
                'Something went wrong'
              )
            ),
            catchError((error) =>
              this.handleFailure(error, actorActions.editActorFailure())
            )
          )
      )
    )
  );

  requestDeleteActor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actorActions.requestDeleteActor),
      switchMap((action) =>
        this._projectService.deleteActor(action.id).pipe(
          map((res) =>
            this.handleResponse(
              res,
              actorActions.deleteActorSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, actorActions.deleteActorFailure())
          )
        )
      )
    )
  );

  listenToErrors$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          actorActions.addActorFailure,
          actorActions.deleteActorFailure,
          actorActions.editActorFailure,
          actorActions.loadActorsFailure
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
