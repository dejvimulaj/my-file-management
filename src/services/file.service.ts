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

  // Fetch files optionally filtered by folderId and userId
  getFiles(folderId?: number, userId?: number): Observable<File[]> {
    const queryParams: string[] = [];
    if (folderId !== undefined) {
      queryParams.push(`folderId=${folderId}`);
    }
    if (userId !== undefined) {
      queryParams.push(`userId=${userId}`);
    }
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    return this.http.get<File[]>(`${this.baseUrl}${queryString}`);
  }

  // Create a new file (storing only metadata) and include the userId
  createFile(file: File, userId: number): Observable<File> {
    file.createdAt = new Date().toISOString();
    file.updatedAt = file.createdAt;
    file.userId = userId; // Ensure the file is associated with the current user
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