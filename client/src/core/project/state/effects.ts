import { catchError, of, switchMap, map } from "rxjs";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { projectActions } from ".";
import { ProjectService } from "../project.service";



@Injectable({providedIn: 'root'})
export class ProjectEffects {
    requestProjects$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestLoadProjects, projectActions.addProjectSuccess, projectActions.deleteProjectSuccess),
        switchMap(() => this._projectService.getProjects().pipe(
            map((projects) => projectActions.loadProjectSuccess({projects})),
            catchError((error) => of(projectActions.loadProjectFailure()))
        ))
    ));

    requestActors$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestLoadActors, projectActions.deleteActorSuccess),
        switchMap(() => this._projectService.getActors().pipe(
            map((actors) => projectActions.loadActorsSuccess({actors})),
            catchError((error) => of(projectActions.loadActorsFailure()))
        ))
    ));

    requestAddProject$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestAddProject),
        switchMap((action) => this._projectService.addProject(action.name, action.heroImage).pipe(
            map(() => projectActions.addProjectSuccess()),
            catchError((error) => of(projectActions.addProjectFailure()))
        ))
    ));

    requestDeleteProject$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestDeleteProject),
        switchMap((action) => this._projectService.deleteProject(action.id).pipe(
            map(() => projectActions.deleteProjectSuccess()),
            catchError((error) => of(projectActions.deleteProjectFailure()))
        ))
    ));

    requestDeleteActor$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestDeleteActor),
        switchMap((action) => this._projectService.deleteActor(action.id).pipe(
            map(() => projectActions.deleteActorSuccess()),
            catchError((error) => of(projectActions.deleteActorFailure()))
        ))
    ));

    public constructor(
        private _store: Store,
        private _actions$: Actions,
        private _projectService: ProjectService
    ) { }
}
