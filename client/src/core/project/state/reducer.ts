import { 
    createReducer, 
    on, 
    Action 
} from "@ngrx/store";

import {actorActions, projectActions} from "."
import { Actor, Project } from "../../../shared/models/index";



export const featureName = 'Projects';

export interface ProjectState {
    projects: Project[],
    actors: Actor[]
};

export const initialState: ProjectState = {
    projects: [],
    actors: []
};

const projectReducer = createReducer(
    initialState,
    on(projectActions.requestLoadProjects, () => ({
        ...initialState
    })),
    on(actorActions.requestLoadActors, () => ({
        ...initialState
    })),
    on(projectActions.loadProjectSuccess, (state, {projects}) => ({
        ...state,
        projects: projects
    })),
    on(actorActions.loadActorsSuccess, (state, {actors}) => ({
        ...state,
        actors: actors
    })),
)

export function reducer(state: ProjectState, action: Action): ProjectState {
    return projectReducer(state, action)
}
