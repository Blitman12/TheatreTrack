import { 
    catchError, 
    of, 
    switchMap,
    map 
} from "rxjs";
import { 
    Actions, 
    createEffect, 
    ofType 
} from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { ProjectService } from "../../project.service";
import { sceneActions } from "..";

@Injectable({ providedIn: 'root' })
export class SceneEffects {
    requestPushActorToScene$ = createEffect(() => this._actions$.pipe(
        ofType(sceneActions.requestPushActorToScene),
        switchMap((action) => this._projectService.pushActorToScene(action.sceneId, action.actorId).pipe(
            map(() => sceneActions.addPushActorToSceneSuccess()),
            catchError((error) => of(sceneActions.addPushActorToSceneFailure()))
        ))
    ));

    requestPullActorToScene$ = createEffect(() => this._actions$.pipe(
        ofType(sceneActions.requestPullActorToScene),
        switchMap((action) => this._projectService.pullActorToScene(action.sceneId, action.actorId).pipe(
            map(() => sceneActions.addPullActorToSceneSuccess()),
            catchError((error) => of(sceneActions.addPullActorToSceneFailure()))
        ))
    ));

    requestAddScene$ = createEffect(() => this._actions$.pipe(
        ofType(sceneActions.requestAddScene),
        switchMap((action) => this._projectService.addScene(action.actId, action.name).pipe(
            map(() => sceneActions.addSceneSuccess()),
            catchError((error) => of(sceneActions.addSceneFailure()))
        ))
    ));

    requestEditScene$ = createEffect(() => this._actions$.pipe(
        ofType(sceneActions.requestEditScene),
        switchMap((action) => this._projectService.editScene(action.id, action.name).pipe(
            map(() => sceneActions.editSceneSuccess()),
            catchError((error) => of(sceneActions.editSceneFailure()))
        ))
    ));

    
    requestDeleteScene$ = createEffect(() => this._actions$.pipe(
        ofType(sceneActions.requestDeleteScene),
        switchMap((action) => this._projectService.deleteScene(action.id).pipe(
            map(() => sceneActions.deleteSceneSuccess()),
            catchError((error) => of(sceneActions.deleteSceneFailure()))
        ))
    ));

    public constructor(
        private _store: Store,
        private _actions$: Actions,
        private _projectService: ProjectService
    ) { }
}
