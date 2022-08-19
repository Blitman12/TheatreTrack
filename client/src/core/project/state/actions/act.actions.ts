import { createAction, props } from '@ngrx/store';

export const requestDeleteAct = createAction(
  '[Landing] Request Delete Act',
  props<{ id: string }>()
);
export const deleteActFailure = createAction('[Landing] Delete Act Failure');
export const deleteActSuccess = createAction('[Landing] Delete Act Success');

export const requestEditAct = createAction(
  '[Landing] Request Edit Act',
  props<{ id: string; name: string }>()
);
export const editActFailure = createAction('[Landing] Edit Act Failure');
export const editActSuccess = createAction('[Landing] Edit Act Success');

export const requestAddAct = createAction(
  '[Landing] Request Add Act',
  props<{ projectId: string; name: string }>()
);
export const addActFailure = createAction('[Landing] Add Act Failure');
export const addActSuccess = createAction('[Landing] Add Act Success');
