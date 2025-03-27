import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from '../store/auth.reducer';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { fileReducer } from '../store/file.reducer';
import { folderReducer } from '../store/folder.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from '../store/auth.effects';
import { FileEffects } from '../store/file.effects';
import { FolderEffects } from '../store/folder.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule,FormsModule),
    provideZoneChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      auth: authReducer,
      file: fileReducer,
      folder: folderReducer
    }),
    provideEffects([AuthEffects, FileEffects, FolderEffects]),
  ]
};
