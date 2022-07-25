import { createReducer, on, Action } from "@ngrx/store";

import {projectActions} from "."
import { Project } from "src/models";



export const featureName = 'Projects';

export interface ProjectState {
    projects: Project[]
};

export const initialState: ProjectState = {
    projects: []
};

const projectReducer = createReducer(
    initialState,
    on(projectActions.requestLoadProjects, () => ({
        ...initialState
    })),
    on(projectActions.loadProjectSuccess, (state, {projects}) => ({
        ...state,
        projects: projects
    }))
)

export function reducer(state: ProjectState, action: Action): ProjectState {
    return projectReducer(state, action)
}
