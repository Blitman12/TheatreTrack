import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import * as fromReducer from './reducer'

const getProjectState = createFeatureSelector<fromReducer.ProjectState>(fromReducer.featureName);

export const getProjectInfo = createSelector(getProjectState, state => state.projects);
export const getActorInfo = createSelector(getProjectState, state => state.actors)
@Injectable({
    providedIn: 'root'
})
export class ProjectSelectors {
    public projectInfo$ = this._store.select(getProjectInfo)
    public actorInfo$ = this._store.select(getActorInfo)
    public constructor(private _store: Store) {}
}
