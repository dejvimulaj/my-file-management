import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../models/file.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3001/files';

  constructor(private http: HttpClient) {}

  // Fetch files (optionally by folder ID)
  getFiles(folderId?: number): Observable<File[]> {
    if (folderId) {
      // Query: /files?folderId=theId
      return this.http.get<File[]>(`${this.baseUrl}?folderId=${folderId}`);
    }
    return this.http.get<File[]>(this.baseUrl);
  }

  // Create a new file (storing only metadata)
  createFile(file: File): Observable<File> {
    file.createdAt = new Date().toISOString();
    file.updatedAt = file.createdAt;
    return this.http.post<File>(this.baseUrl, file);
  }

  // Update file details
  updateFile(fileId: number, data: Partial<File>): Observable<File> {
    data.updatedAt = new Date().toISOString();
    return this.http.patch<File>(`${this.baseUrl}/${fileId}`, data);
  }

  // Delete a file
  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${fileId}`);
  }
}
