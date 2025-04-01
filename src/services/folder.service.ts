import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folder } from '../models/folder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private baseUrl = 'http://localhost:3001/folders';

  constructor(private http: HttpClient) {}

  // Fetch all folders
  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.baseUrl);
  }

  // Create a new folder
  createFolder(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>(this.baseUrl, folder);
  }

  // Update an existing folder
  updateFolder(folderId: number, changes: Partial<Folder>): Observable<Folder> {
    changes.updatedAt = new Date().toISOString();
    return this.http.patch<Folder>(`${this.baseUrl}/${folderId}`, changes);
  }

  // Delete a folder
  deleteFolder(folderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${folderId}`);
  }

    // Fetch folders for a given user
    getFoldersByUser(userId: number): Observable<Folder[]> {
      return this.http.get<Folder[]>(`${this.baseUrl}?userId=${userId}`);
    }
}
