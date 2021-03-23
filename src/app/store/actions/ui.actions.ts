import { createAction } from '@ngrx/store';

export const isLoading = createAction('[ui Component] is Loading');
export const stopLoading = createAction('[ui Component] stop Loading');