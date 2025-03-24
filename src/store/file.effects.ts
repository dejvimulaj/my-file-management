import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FileActions from './file.actions';
import { FileService } from '../services/file.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FileEffects {
  constructor(
    private actions$: Actions,
    private fileService: FileService
  ) {}

  // Effect to load files; if folderId is provided, it filters accordingly.
  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.loadFiles),
      mergeMap(action =>
        this.fileService.getFiles(action.folderId).pipe(
          map(files => FileActions.loadFilesSuccess({ files })),
          catchError(error => of(FileActions.loadFilesFailure({ error })))
        )
      )
    )
  );

  // Effect to add a new file using createFile method from FileService.
  addFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.addFile),
      mergeMap(action =>
        this.fileService.createFile(action.file).pipe(
          map(file => FileActions.addFileSuccess({ file })),
          catchError(error => of(FileActions.addFileFailure({ error })))
        )
      )
    )
  );

  // Effect to delete a file using the deleteFile method.
  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.deleteFile),
      mergeMap(action =>
        this.fileService.deleteFile(action.fileId).pipe(
          map(() => FileActions.deleteFileSuccess({ fileId: action.fileId })),
          catchError(error => of(FileActions.deleteFileFailure({ error })))
        )
      )
    )
  );
}
