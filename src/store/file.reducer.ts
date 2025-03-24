import { createReducer, on } from '@ngrx/store';
import * as FileActions from './file.actions';
import { File } from '../models/file.model';

export interface FileState {
  files: File[];
  loading: boolean;
  error: any;
}

export const initialState: FileState = {
  files: [],
  loading: false,
  error: null
};

export const fileReducer = createReducer(
  initialState,
  // Loading files
  on(FileActions.loadFiles, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FileActions.loadFilesSuccess, (state, { files }) => ({
    ...state,
    files,
    loading: false
  })),
  on(FileActions.loadFilesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Adding a file
  on(FileActions.addFile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FileActions.addFileSuccess, (state, { file }) => ({
    ...state,
    files: [...state.files, file],
    loading: false
  })),
  on(FileActions.addFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // Deleting a file
  on(FileActions.deleteFile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FileActions.deleteFileSuccess, (state, { fileId }) => ({
    ...state,
    files: state.files.filter(file => file.id !== fileId),
    loading: false
  })),
  on(FileActions.deleteFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
