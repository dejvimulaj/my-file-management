import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { AuthState } from '../../store/auth.reducer'; // example path
import { Folder } from '../../models/folder.model';
import { File } from '../../models/file.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss'
})
export class FoldersComponent implements OnInit {
  folders: Folder[] = [];
  files: File[] = [];
  userId = 4; // Example user ID; get from local storage / auth as needed

  // Which folders are open (expanded)
  openState: { [folderId: number]: boolean } = {};

  // Tracks selected folders and files
  selectedFolders: Folder[] = [];
  selectedFiles: File[] = [];

  constructor(
    private folderService: FolderService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    // Load all folders and files for userId
    this.folderService.getFoldersByUser(this.userId).subscribe({
      next: (res) => (this.folders = res),
      error: (err) => console.error('Error fetching folders:', err),
    });

    this.fileService.getFilesByUser(this.userId).subscribe({
      next: (res) => (this.files = res),
      error: (err) => console.error('Error fetching files:', err),
    });
  }

  // Toggle folder open/close
  toggleFolder(folder: Folder) {
    const isOpen = this.openState[folder.id!] ?? false;
    this.openState[folder.id!] = !isOpen;
  }

  // Check if folder is open
  isFolderOpen(folder: Folder): boolean {
    return this.openState[folder.id!] || false;
  }

  // Return folders that have parentId = null
  getTopLevelFolders(): Folder[] {
    return this.folders.filter((f) => f.parentId === null);
  }

  // Return child folders of a given folder
  getChildFolders(folderId: number): Folder[] {
    return this.folders.filter((f) => f.parentId === folderId);
  }

  // Return files that belong to a given folder
  getFilesForFolder(folderId: number): File[] {
    return this.files.filter((file) => file.folderId === folderId);
  }

  // Folder selection
  toggleFolderSelection(folder: Folder) {
    const index = this.selectedFolders.findIndex((f) => f.id === folder.id);
    if (index > -1) {
      this.selectedFolders.splice(index, 1);
    } else {
      this.selectedFolders.push(folder);
    }
    console.log('Selected folders:', this.selectedFolders);
  }

  isFolderSelected(folder: Folder): boolean {
    return this.selectedFolders.some((f) => f.id === folder.id);
  }

  // File selection
  toggleFileSelection(file: File) {
    const index = this.selectedFiles.findIndex((f) => f.id === file.id);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    } else {
      this.selectedFiles.push(file);
    }
    console.log('Selected files:', this.selectedFiles);
  }

  isFileSelected(file: File): boolean {
    return this.selectedFiles.some((f) => f.id === file.id);
  }

  getIconForFile(fileType: string): string {
    switch (fileType) {
      case 'application/pdf':
        return '📄'; // PDF icon (emoji)
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return '📝'; // Word Doc
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return '🖼️'; // Image icon
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return '📊'; // Excel
      default:
        return '📄'; // Generic file
    }
  }
}
