import { createAction, props } from "@ngrx/store";

import { Project } from "../../../shared/models/index";

export const requestLoadProjects = createAction('[Landing] Request Load Projects');
export const loadProjectFailure = createAction('[Landing] Get Projects Failed');
export const loadProjectSuccess = createAction('[Landing] Got Projects', props<{projects: Project[]}>());

export const requestAddProject = createAction('[Landing] Request Add Project', props<{name: string, heroImage?: string}>());
export const addProjectFailure = createAction('[Landing] Add Project Failure');
export const addProjectSuccess = createAction('[Landing] Add Project Success');

export const requestDeleteProject = createAction('[Landing] Request Delete Project', props<{id: string}>());
export const deleteProjectFailure = createAction('[Landing] Delete Project Failure');
export const deleteProjectSuccess = createAction('[Landing] Delete Project Success');