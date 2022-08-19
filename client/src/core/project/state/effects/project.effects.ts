import { catchError, of, switchMap, map, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { BaseEffects } from 'src/shared/bases';

import { actActions, projectActions, sceneActions } from '..';
import { ProjectService } from '../../project.service';
import { ErrorModalComponent } from 'src/shared/error-modal/error-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ProjectEffects extends BaseEffects {
  requestProjects$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        projectActions.requestLoadProjects,
        projectActions.addProjectSuccess,
        projectActions.deleteProjectSuccess,
        projectActions.editProjectSuccess,
        actActions.addActSuccess,
        actActions.deleteActSuccess,
        actActions.editActSuccess,
        sceneActions.addSceneSuccess,
        sceneActions.deleteSceneSuccess,
        sceneActions.editSceneSuccess,
        sceneActions.addPushActorToSceneSuccess,
        sceneActions.addPullActorToSceneSuccess
      ),
      switchMap(() =>
        this._projectService.getProjects().pipe(
          map((projects) =>
            this.handleResponse(
              projects,
              projectActions.loadProjectSuccess({ projects }),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, projectActions.loadProjectFailure())
          )
        )
      )
    )
  );

  requestAddProject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(projectActions.requestAddProject),
      switchMap((action) =>
        this._projectService.addProject(action.name, action.heroImage).pipe(
          map((res) =>
            this.handleResponse(
              res,
              projectActions.addProjectSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, projectActions.addProjectFailure())
          )
        )
      )
    )
  );

  requestEditProject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(projectActions.requestEditProject),
      switchMap((action) =>
        this._projectService
          .editProject(action.id, action?.name, action?.heroImage)
          .pipe(
            map((res) =>
              this.handleResponse(
                res,
                projectActions.editProjectSuccess(),
                'Something went wrong'
              )
            ),
            catchError((error) =>
              this.handleFailure(error, projectActions.editProjectFailure())
            )
          )
      )
    )
  );

  requestDeleteProject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(projectActions.requestDeleteProject),
      switchMap((action) =>
        this._projectService.deleteProject(action.id).pipe(
          map((res) =>
            this.handleResponse(
              res,
              projectActions.deleteProjectSuccess(),
              'Something went wrong'
            )
          ),
          catchError((error) =>
            this.handleFailure(error, projectActions.deleteProjectFailure())
          )
        )
      )
    )
  );

  listenToErrors$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          projectActions.addProjectFailure,
          projectActions.deleteProjectFailure,
          projectActions.editProjectFailure,
          projectActions.loadProjectFailure
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
