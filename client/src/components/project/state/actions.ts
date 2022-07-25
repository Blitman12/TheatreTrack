import { createAction, props } from "@ngrx/store";

import { Project } from "src/models";

export const requestLoadProjects = createAction('[Landing] Request Load Projects');
export const loadProjectFailure = createAction('[Landing] Get Projects Failed');
export const loadProjectSuccess = createAction('[Landing] Got Projects', props<{projects: Project[]}>());

