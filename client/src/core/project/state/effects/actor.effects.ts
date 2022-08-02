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

import { actorActions } from "..";
import { ProjectService } from "../../project.service";




@Injectable({ providedIn: 'root' })
export class ActorEffects {
    requestActors$ = createEffect(() => this._actions$.pipe(
        ofType(actorActions.requestLoadActors, actorActions.addActorSuccess, actorActions.deleteActorSuccess, actorActions.editActorSuccess),
        switchMap(() => this._projectService.getActors().pipe(
            map((actors) => actorActions.loadActorsSuccess({ actors })),
            catchError((error) => of(actorActions.loadActorsFailure()))
        ))
    ));

    requestAddActor$ = createEffect(() => this._actions$.pipe(
        ofType(actorActions.requestAddActor),
        switchMap((action) => this._projectService.addActor(action.firstName, action.lastName, action.age, action?.currentCharacter).pipe(
            map(() => actorActions.addActorSuccess()),
            catchError((error) => of(actorActions.addActorFailure()))
        ))
    ));

    requestEditActor$ = createEffect(() => this._actions$.pipe(
        ofType(actorActions.requestEditActor),
        switchMap((action) => this._projectService.editActor(action.id, action?.firstName, action?.lastName, action?.age, action?.currentCharacter).pipe(
            map(() => actorActions.editActorSuccess()),
            catchError((error) => of(actorActions.editActorFailure()))
        ))
    ));

    requestDeleteActor$ = createEffect(() => this._actions$.pipe(
        ofType(actorActions.requestDeleteActor),
        switchMap((action) => this._projectService.deleteActor(action.id).pipe(
            map(() => actorActions.deleteActorSuccess()),
            catchError((error) => of(actorActions.deleteActorFailure()))
        ))
    ));

    public constructor(
        private _store: Store,
        private _actions$: Actions,
        private _projectService: ProjectService
    ) { }
}
