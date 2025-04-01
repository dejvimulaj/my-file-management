import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FolderState } from './folder.reducer';

export const selectFolderState = createFeatureSelector<FolderState>('folder');

export const selectAllFolders = createSelector(
  selectFolderState,
  (state) => state.folders
);

export const selectFolderLoading = createSelector(
  selectFolderState,
  (state) => state.loading
);
