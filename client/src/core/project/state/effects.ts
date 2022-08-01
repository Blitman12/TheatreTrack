import { catchError, of, switchMap, map } from "rxjs";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { projectActions } from ".";
import { ProjectService } from "../project.service";



@Injectable({ providedIn: 'root' })
export class ProjectEffects {
    requestProjects$ = createEffect(() => this._actions$.pipe(
        ofType(
            projectActions.requestLoadProjects,
            projectActions.addProjectSuccess,
            projectActions.deleteProjectSuccess,
            projectActions.editProjectSuccess,
            projectActions.addSceneSuccess,
            projectActions.deleteActSuccess,
            projectActions.addActSuccess,
            projectActions.editActSuccess,
            projectActions.deleteSceneSuccess,
            projectActions.editSceneSuccess,
            projectActions.addPushActorToSceneSuccess,
            projectActions.addPullActorToSceneSuccess
        ),
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

    requestPushActorToScene$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestPushActorToScene),
        switchMap((action) => this._projectService.pushActorToScene(action.sceneId, action.actorId).pipe(
            map(() => projectActions.addPushActorToSceneSuccess()),
            catchError((error) => of(projectActions.addPushActorToSceneFailure()))
        ))
    ));

    requestPullActorToScene$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestPullActorToScene),
        switchMap((action) => this._projectService.pullActorToScene(action.sceneId, action.actorId).pipe(
            map(() => projectActions.addPullActorToSceneSuccess()),
            catchError((error) => of(projectActions.addPullActorToSceneFailure()))
        ))
    ));

    requestAddScene$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestAddScene),
        switchMap((action) => this._projectService.addScene(action.id, action.name).pipe(
            map(() => projectActions.addSceneSuccess()),
            catchError((error) => of(projectActions.addSceneFailure()))
        ))
    ));

    requestAddAct$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestAddAct),
        switchMap((action) => this._projectService.addAct(action.id, action.name).pipe(
            map(() => projectActions.addActSuccess()),
            catchError((error) => of(projectActions.addActFailure()))
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

    requestEditAct$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestEditAct),
        switchMap((action) => this._projectService.editAct(action.id, action.name).pipe(
            map(() => projectActions.editActSuccess()),
            catchError((error) => of(projectActions.editActFailure()))
        ))
    ));

    
    requestEditScene$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestEditScene),
        switchMap((action) => this._projectService.editScene(action.id, action.name).pipe(
            map(() => projectActions.editSceneSuccess()),
            catchError((error) => of(projectActions.editSceneFailure()))
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

    requestDeleteAct$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestDeleteAct),
        switchMap((action) => this._projectService.deleteAct(action.id).pipe(
            map(() => projectActions.deleteActSuccess()),
            catchError((error) => of(projectActions.deleteActFailure()))
        ))
    ));
    
    requestDeleteScene$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestDeleteScene),
        switchMap((action) => this._projectService.deleteScene(action.id).pipe(
            map(() => projectActions.deleteSceneSuccess()),
            catchError((error) => of(projectActions.deleteSceneFailure()))
        ))
    ));

    public constructor(
        private _store: Store,
        private _actions$: Actions,
        private _projectService: ProjectService
    ) { }
}
