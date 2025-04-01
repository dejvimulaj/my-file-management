import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AuthState } from '../../store/auth.reducer';
import { FolderService } from '../../services/folder.service';
import { FileService } from '../../services/file.service';

import { Folder } from '../../models/folder.model';
import { File } from '../../models/file.model';
import { loadFolders } from '../../store/folder.actions';
import { Observable } from 'rxjs';
import { selectAllFolders } from '../../store/folder.selectors';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  // Holds the current user's ID. We get this from the store, so initially null.
  userId: number | null = null;

  folders: Folder[] = [];
  folders$!: Observable<Folder[]>;
  files: File[] = [];

  // Controls open/close states for folders
  openState: { [folderId: number]: boolean } = {};

  // Tracks selected folders and files
  selectedFolders: Folder[] = [];
  selectedFiles: File[] = [];

  constructor(
    private authStore: Store<{ auth: AuthState }>,  // We'll select userId from here
    private folderService: FolderService,
    private fileService: FileService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // 1) Get the userId from auth state.
    // 2) Once we have a userId, call folderService and fileService to fetch data.
    this.authStore
      .select(state => state.auth.user?.id)
      .pipe(
        tap(uid => {
          this.userId = uid ?? null;
          console.log('Got user ID from store:', this.userId);

          // If we do have a userId, fetch folders and files
          if (this.userId !== null) {
            this.store.dispatch(loadFolders({ userId: this.userId }));
            this.loadFoldersAndFiles(this.userId);
          }
        })
      )
      .subscribe();
      this.folders$ = this.store.select(selectAllFolders);
  }

  // Helper method to fetch folders/files once userId is known
  private loadFoldersAndFiles(uid: number) {
    // Folders
    this.folderService.getFoldersByUser(uid).subscribe({
      next: (res) => (this.folders = res),
      error: (err) => console.error('Error fetching folders:', err),
    });

    // Files
    this.fileService.getFilesByUser(uid).subscribe({
      next: (res) => (this.files = res),
      error: (err) => console.error('Error fetching files:', err),
    });
  }

  // -------------------------------------------
  // Folder Accordion Logic
  // -------------------------------------------
  toggleFolder(folder: Folder) {
    const isOpen = this.openState[folder.id!] ?? false;
    this.openState[folder.id!] = !isOpen;
  }

  isFolderOpen(folder: Folder): boolean {
    return this.openState[folder.id!] || false;
  }

  getTopLevelFolders(): Folder[] {
    return this.folders.filter((f) => f.parentId === null);
  }

  getChildFolders(folderId: number): Folder[] {
    return this.folders.filter((f) => f.parentId === folderId);
  }

  getFilesForFolder(folderId: number): File[] {
    return this.files.filter((file) => file.folderId === folderId);
  }

  // -------------------------------------------
  // Selection Logic
  // -------------------------------------------
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

  // -------------------------------------------
  // File Icons by Type
  // -------------------------------------------
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
