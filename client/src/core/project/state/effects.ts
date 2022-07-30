import { catchError, of, switchMap, map } from "rxjs";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { projectActions } from ".";
import { ProjectService } from "../project.service";



@Injectable({ providedIn: 'root' })
export class ProjectEffects {
    requestProjects$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestLoadProjects, projectActions.addProjectSuccess, projectActions.deleteProjectSuccess, projectActions.editProjectSuccess, projectActions.addSceneSuccess, projectActions.deleteActSuccess),
        switchMap(() => this._projectService.getProjects().pipe(
            map((projects) => projectActions.loadProjectSuccess({ projects })),
            catchError((error) => of(projectActions.loadProjectFailure()))
        ))
    ));

    requestActors$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestLoadActors, projectActions.addActorSuccess, projectActions.deleteActorSuccess, projectActions.editActorSuccess),
        switchMap(() => this._projectService.getActors().pipe(
            map((actors) => projectActions.loadActorsSuccess({ actors })),
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

    requestAddActor$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestAddActor),
        switchMap((action) => this._projectService.addActor(action.firstName, action.lastName, action.age, action?.currentCharacter).pipe(
            map(() => projectActions.addActorSuccess()),
            catchError((error) => of(projectActions.addActorFailure()))
        ))
    ));

    requestAddScene$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestAddScene),
        switchMap((action) => this._projectService.addScene(action.id, action.name).pipe(
            map(() => projectActions.addSceneSuccess()),
            catchError((error) => of(projectActions.addSceneFailure()))
        ))
    ));

    requestEditProject$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestEditProject),
        switchMap((action) => this._projectService.editProject(action.id, action?.name, action?.heroImage).pipe(
            map(() => projectActions.editProjectSuccess()),
            catchError((error) => of(projectActions.editProjectFailure()))
        ))
    ));

    requestEditActor$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestEditActor),
        switchMap((action) => this._projectService.editActor(action.id, action?.firstName, action?.lastName, action?.age, action?.currentCharacter).pipe(
            map(() => projectActions.editActorSuccess()),
            catchError((error) => of(projectActions.editActorFailure()))
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

    requestDeleteScene$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestDeleteAct),
        switchMap((action) => this._projectService.deleteAct(action.id).pipe(
            map(() => projectActions.deleteActSuccess()),
            catchError((error) => of(projectActions.deleteActFailure()))
        ))
    ));

    public constructor(
        private _store: Store,
        private _actions$: Actions,
        private _projectService: ProjectService
    ) { }
}
