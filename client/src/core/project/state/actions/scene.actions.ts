import { createAction, props } from "@ngrx/store";

export const requestPushActorToScene = createAction('[Landing] Request Push Actor To Scene', props<{ sceneId: string, actorId: string }>());
export const addPushActorToSceneFailure = createAction('[Landing] Push Actor To Scene Failure');
export const addPushActorToSceneSuccess = createAction('[Landing] Push Actor To Scene Success');

export const requestPullActorToScene = createAction('[Landing] Request Pull Actor To Scene', props<{ sceneId: string, actorId: string }>());
export const addPullActorToSceneFailure = createAction('[Landing] Pull Actor To Scene Failure');
export const addPullActorToSceneSuccess = createAction('[Landing] Pull Actor To Scene Success');

export const requestAddScene = createAction('[Landing] Request Add Scene', props<{ actId: string, name: string }>());
export const addSceneFailure = createAction('[Landing] Add Scene Failure');
export const addSceneSuccess = createAction('[Landing] Add Scene Success');

export const requestEditScene = createAction('[Landing] Request Edit Scene', props<{ id: string, name: string }>());
export const editSceneFailure = createAction('[Landing] Edit Scene Failure');
export const editSceneSuccess = createAction('[Landing] Edit Scene Success');

export const requestDeleteScene = createAction('[Landing] Request Delete Scene', props<{ id: string }>());
export const deleteSceneFailure = createAction('[Landing] Delete Scene Failure');
export const deleteSceneSuccess = createAction('[Landing] Delete Scene Success');
