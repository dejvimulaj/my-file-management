import { createAction, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';

// Load all folders.
export const loadFolders = createAction(
  '[Folder] Load Folders',
  props<{ userId: number }>()
);

export const loadFoldersSuccess = createAction(
  '[Folder] Load Folders Success',
  props<{ folders: Folder[] }>()
);

export const loadFoldersFailure = createAction(
  '[Folder] Load Folders Failure',
  props<{ error: any }>()
);

// Create a new folder.
export const addFolder = createAction(
  '[Folder] Add Folder',
  props<{ folder: Folder }>()
);

export const addFolderSuccess = createAction(
  '[Folder] Add Folder Success',
  props<{ folder: Folder }>()
);

export const addFolderFailure = createAction(
  '[Folder] Add Folder Failure',
  props<{ error: any }>()
);

// Update an existing folder (e.g., rename).
export const updateFolder = createAction(
  '[Folder] Update Folder',
  props<{ folder: Folder }>()
);

export const updateFolderSuccess = createAction(
  '[Folder] Update Folder Success',
  props<{ folder: Folder }>()
);

export const updateFolderFailure = createAction(
  '[Folder] Update Folder Failure',
  props<{ error: any }>()
);

// Delete a folder.
export const deleteFolder = createAction(
  '[Folder] Delete Folder',
  props<{ folderId: number }>()
);

export const deleteFolderSuccess = createAction(
  '[Folder] Delete Folder Success',
  props<{ folderId: number }>()
);

export const deleteFolderFailure = createAction(
  '[Folder] Delete Folder Failure',
  props<{ error: any }>()
);
