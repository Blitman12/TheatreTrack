import { createAction, props } from "@ngrx/store";

import { Actor, Project } from "../../../shared/models/index";

export const requestLoadProjects = createAction('[Landing] Request Load Projects');
export const loadProjectFailure = createAction('[Landing] Get Projects Failed');
export const loadProjectSuccess = createAction('[Landing] Got Projects Success', props<{ projects: Project[] }>());

export const requestAddProject = createAction('[Landing] Request Add Project', props<{ name: string, heroImage?: string }>());
export const addProjectFailure = createAction('[Landing] Add Project Failure');
export const addProjectSuccess = createAction('[Landing] Add Project Success');

export const requestEditProject = createAction('[Landing] Request Edit Project', props<{ id: string, name?: string, heroImage?: string }>());
export const editProjectFailure = createAction('[Landing] Edit Project Failure');
export const editProjectSuccess = createAction('[Landing] Edit Project Success');

export const requestDeleteProject = createAction('[Landing] Request Delete Project', props<{ id: string }>());
export const deleteProjectFailure = createAction('[Landing] Delete Project Failure');
export const deleteProjectSuccess = createAction('[Landing] Delete Project Success');

export const requestLoadActors = createAction('[Landing] Request Load Actors');
export const loadActorsFailure = createAction('[Landing] Get Actors Failed');
export const loadActorsSuccess = createAction('[Landing] Got Actors Success', props<{ actors: Actor[] }>());

export const requestDeleteActor = createAction('[Landing] Request Delete Actor', props<{ id: string }>());
export const deleteActorFailure = createAction('[Landing] Delete Actor Failure');
export const deleteActorSuccess = createAction('[Landing] Delete Actor Success');

export const requestAddActor = createAction('[Landing] Request Add Actor', props<{ firstName: string, lastName: string, age: number, currentCharacter?: string }>());
export const addActorFailure = createAction('[Landing] Add Actor Failure');
export const addActorSuccess = createAction('[Landing] Add Actor Success');

export const requestEditActor = createAction('[Landing] Request Edit Actor', props<{ id: string, firstName?: string, lastName?: string, age?: number, currentCharacter?: string }>());
export const editActorFailure = createAction('[Landing] Edit Actor Failure');
export const editActorSuccess = createAction('[Landing] Edit Actor Success');

export const requestAddScene = createAction('[Landing] Request Add Scene', props<{ id: string, name: string }>());
export const addSceneFailure = createAction('[Landing] Add Scene Failure');
export const addSceneSuccess = createAction('[Landing] Add Scene Success');

export const requestDeleteAct = createAction('[Landing] Request Delete Act', props<{ id: string }>());
export const deleteActFailure = createAction('[Landing] Delete Act Failure');
export const deleteActSuccess = createAction('[Landing] Delete Act Success');

export const requestAddAct = createAction('[Landing] Request Add Act', props<{ id: string, name: string }>());
export const addActFailure = createAction('[Landing] Add Act Failure');
export const addActSuccess = createAction('[Landing] Add Act Success');