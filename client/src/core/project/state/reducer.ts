import { Statement } from '@angular/compiler';
import { createReducer, on, Action } from '@ngrx/store';

import { actorActions, projectActions } from '.';
import { Actor, Project } from '../../../shared/models/index';
import { toggleActorBar } from './actions/actor.actions';

export const featureName = 'Projects';

export interface ProjectState {
  projects: Project[];
  actors: Actor[];
  toggleActorBar: boolean;
}

export const initialState: ProjectState = {
  projects: [],
  actors: [],
  toggleActorBar: false,
};

const projectReducer = createReducer(
  initialState,
  on(projectActions.requestLoadProjects, () => ({
    ...initialState,
  })),
  on(actorActions.requestLoadActors, () => ({
    ...initialState,
  })),
  on(projectActions.loadProjectSuccess, (state, { projects }) => ({
    ...state,
    projects: projects,
  })),
  on(actorActions.loadActorsSuccess, (state, { actors }) => ({
    ...state,
    actors: actors,
  })),
  on(actorActions.toggleActorBar, (state) => ({
    ...state,
    toggleActorBar: !state.toggleActorBar,
  }))
);

export function reducer(state: ProjectState, action: Action): ProjectState {
  return projectReducer(state, action);
}
