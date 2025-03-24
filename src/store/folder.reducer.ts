import { createReducer, on } from '@ngrx/store';
import * as FolderActions from './folder.actions';
import { Folder } from '../models/folder.model';

export interface FolderState {
  folders: Folder[];
  loading: boolean;
  error: any;
}

export const initialState: FolderState = {
  folders: [],
  loading: false,
  error: null
};

export const folderReducer = createReducer(
  initialState,
  // Loading folders
  on(FolderActions.loadFolders, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FolderActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    loading: false
  })),
  on(FolderActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Adding a folder
  on(FolderActions.addFolder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FolderActions.addFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: [...state.folders, folder],
    loading: false
  })),
  on(FolderActions.addFolderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Updating a folder (e.g., renaming)
  on(FolderActions.updateFolder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FolderActions.updateFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: state.folders.map(f => f.id === folder.id ? folder : f),
    loading: false
  })),
  on(FolderActions.updateFolderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Deleting a folder
  on(FolderActions.deleteFolder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FolderActions.deleteFolderSuccess, (state, { folderId }) => ({
    ...state,
    folders: state.folders.filter(folder => folder.id !== folderId),
    loading: false
  })),
  on(FolderActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
