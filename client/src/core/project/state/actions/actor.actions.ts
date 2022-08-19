import { createAction, props } from '@ngrx/store';
import { Actor } from 'src/shared/models';

export const requestLoadActors = createAction('[Landing] Request Load Actors');
export const loadActorsFailure = createAction('[Landing] Get Actors Failed');
export const loadActorsSuccess = createAction(
  '[Landing] Got Actors Success',
  props<{ actors: Actor[] }>()
);

export const requestDeleteActor = createAction(
  '[Landing] Request Delete Actor',
  props<{ id: string }>()
);
export const deleteActorFailure = createAction(
  '[Landing] Delete Actor Failure'
);
export const deleteActorSuccess = createAction(
  '[Landing] Delete Actor Success'
);

export const requestAddActor = createAction(
  '[Landing] Request Add Actor',
  props<{
    firstName: string;
    lastName: string;
    age: number;
    currentCharacter?: string;
  }>()
);
export const addActorFailure = createAction('[Landing] Add Actor Failure');
export const addActorSuccess = createAction('[Landing] Add Actor Success');

export const requestEditActor = createAction(
  '[Landing] Request Edit Actor',
  props<{
    id: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    currentCharacter?: string;
  }>()
);
export const editActorFailure = createAction('[Landing] Edit Actor Failure');
export const editActorSuccess = createAction('[Landing] Edit Actor Success');

export const toggleActorBar = createAction('[Landing] Toggle Actor Bar');
