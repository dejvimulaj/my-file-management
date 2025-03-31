import { createAction, props } from '@ngrx/store';
import { File } from '../models/file.model';

// Load files filtered by user (and optionally by folder)
export const loadFiles = createAction(
  '[File] Load Files',
  props<{ userId: number; folderId?: number }>()
);

export const loadFilesSuccess = createAction(
  '[File] Load Files Success',
  props<{ files: File[] }>()
);

export const loadFilesFailure = createAction(
  '[File] Load Files Failure',
  props<{ error: any }>()
);

// Create a new file, including userId to set ownership
export const addFile = createAction(
  '[File] Add File',
  props<{ file: File; userId: number }>()
);

export const addFileSuccess = createAction(
  '[File] Add File Success',
  props<{ file: File }>()
);

export const addFileFailure = createAction(
  '[File] Add File Failure',
  props<{ error: any }>()
);

// Delete a file
export const deleteFile = createAction(
  '[File] Delete File',
  props<{ fileId: number }>()
);

export const deleteFileSuccess = createAction(
  '[File] Delete File Success',
  props<{ fileId: number }>()
);

export const deleteFileFailure = createAction(
  '[File] Delete File Failure',
  props<{ error: any }>()
);
