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

import { actActions } from "..";
import { ProjectService } from "../../project.service";



@Injectable({ providedIn: 'root' })
export class ActEffects {
    requestAddAct$ = createEffect(() => this._actions$.pipe(
        ofType(actActions.requestAddAct),
        switchMap((action) => this._projectService.addAct(action.projectId, action.name).pipe(
            map(() => actActions.addActSuccess()),
            catchError((error) => of(actActions.addActFailure()))
        ))
    ));

    requestEditAct$ = createEffect(() => this._actions$.pipe(
        ofType(actActions.requestEditAct),
        switchMap((action) => this._projectService.editAct(action.id, action.name).pipe(
            map(() => actActions.editActSuccess()),
            catchError((error) => of(actActions.editActFailure()))
        ))
    ));

    requestDeleteAct$ = createEffect(() => this._actions$.pipe(
        ofType(actActions.requestDeleteAct),
        switchMap((action) => this._projectService.deleteAct(action.id).pipe(
            map(() => actActions.deleteActSuccess()),
            catchError((error) => of(actActions.deleteActFailure()))
        ))
    ));
    
    public constructor(
        private _store: Store,
        private _actions$: Actions,
        private _projectService: ProjectService
    ) { }
}
