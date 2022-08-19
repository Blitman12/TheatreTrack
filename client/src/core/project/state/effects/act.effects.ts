import { catchError, switchMap, map, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { actActions } from '..';
import { ProjectService } from '../../project.service';
import { ErrorModalComponent } from 'src/shared/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BaseEffects } from 'src/shared/bases';

@Injectable({ providedIn: 'root' })
export class ActEffects extends BaseEffects {
  requestAddAct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actActions.requestAddAct),
      switchMap((action) =>
        this._projectService.addAct(action.projectId, action.name).pipe(
          map((res) =>
            this.handleResponse(
              res,
              actActions.addActSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, actActions.addActFailure())
          )
        )
      )
    )
  );

  requestEditAct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actActions.requestEditAct),
      switchMap((action) =>
        this._projectService.editAct(action.id, action.name).pipe(
          map((res) =>
            this.handleResponse(
              res,
              actActions.editActSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, actActions.editActFailure())
          )
        )
      )
    )
  );

  requestDeleteAct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(actActions.requestDeleteAct),
      switchMap((action) =>
        this._projectService.deleteAct(action.id).pipe(
          map((res) =>
            this.handleResponse(
              res,
              actActions.deleteActSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, actActions.deleteActFailure())
          )
        )
      )
    )
  );

  listenToErrors$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          actActions.addActFailure,
          actActions.deleteActFailure,
          actActions.editActFailure
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
