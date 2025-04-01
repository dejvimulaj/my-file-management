import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FolderActions from './folder.actions';
import { FolderService } from '../services/folder.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FolderEffects {

  private actions$ = inject(Actions);
    private folderService= inject(FolderService);


  // Load folders
  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FolderActions.loadFolders),
      mergeMap(() =>
        this.folderService.getFolders().pipe(
          map(folders => FolderActions.loadFoldersSuccess({ folders })),
          catchError(error => of(FolderActions.loadFoldersFailure({ error })))
        )
      )
    )
  );

  // Add a new folder
  addFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FolderActions.addFolder),
      mergeMap(action =>
        this.folderService.createFolder(action.folder).pipe(
          map(createdFolder =>
            FolderActions.addFolderSuccess({ folder: createdFolder })
          ),
          catchError(error => of(FolderActions.addFolderFailure({ error })))
        )
      )
    )
  );

  // Update (rename) a folder.
  updateFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FolderActions.updateFolder),
      mergeMap(action =>
        this.folderService.updateFolder(action.folder.id!, action.folder).pipe(
          map(folder => FolderActions.updateFolderSuccess({ folder })),
          catchError(error => of(FolderActions.updateFolderFailure({ error })))
        )
      )
    )
  );

  // Delete a folder.
  deleteFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FolderActions.deleteFolder),
      mergeMap(action =>
        this.folderService.deleteFolder(action.folderId).pipe(
          map(() => FolderActions.deleteFolderSuccess({ folderId: action.folderId })),
          catchError(error => of(FolderActions.deleteFolderFailure({ error })))
        )
      )
    )
  );
}
