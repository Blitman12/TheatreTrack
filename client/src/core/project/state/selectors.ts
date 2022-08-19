import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as fromReducer from './reducer';

const getProjectState = createFeatureSelector<fromReducer.ProjectState>(
  fromReducer.featureName
);

export const getProjectInfo = createSelector(
  getProjectState,
  (state) => state.projects
);
export const getActorInfo = createSelector(
  getProjectState,
  (state) => state.actors
);
export const getActorToggleState = createSelector(
  getProjectState,
  (state) => state.toggleActorBar
);
@Injectable({
  providedIn: 'root',
})
export class ProjectSelectors {
  public projectInfo$ = this._store.select(getProjectInfo);
  public actorInfo$ = this._store.select(getActorInfo);
  public actorToggleState = this._store.select(getActorToggleState);
  public constructor(private _store: Store) {}
}
