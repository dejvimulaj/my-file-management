import { FolderService } from './../../services/folder.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AuthActions from '../../store/auth.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Folder } from '../../models/folder.model';
import { AuthState } from '../../store/auth.reducer';
import { tap } from 'rxjs';
import * as FolderActions from '../../store/folder.actions';

type ModalState = 'choice' | 'folder' | 'file';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: `./main-layout.component.html`,
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private store: Store,
    private folderService: FolderService,
    private authStore: Store<{ auth: AuthState }>,
  ) {}

  userId: number | null = null;

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
  folders: Folder[] = [];
  selectedFolderId: number | null = null;

  ngOnInit() {

    this.authStore.select(state => state.auth.user?.id).subscribe(uid => {
      this.userId = uid ?? null;
      if (this.userId !== null) {

        this.folderService.getFoldersByUser(this.userId).subscribe({
          next: (res) => (this.folders = res),
          error: (err) => console.error('Error fetching folders:', err),
        });
      }
      });
  }

 showNewModal = false;


 modalState: ModalState = 'choice';

  // For folder creation
  newFolderName = '';

  // For file upload
  selectedFile?: File;

  onNewClick() {
    this.showNewModal = true;
    this.modalState = 'choice';  // default state
  }

  closeModal() {
    this.showNewModal = false;
    // Reset states if needed
    this.modalState = 'choice';
    this.newFolderName = '';
    this.selectedFile = undefined;
  }

  // CHOOSING FOLDER OR FILE
  chooseFolder() {
    this.modalState = 'folder';
    this.newFolderName = '';
  }

  chooseFile() {
    this.modalState = 'file';
    this.selectedFile = undefined;
  }

  // FOLDER CREATION
  createFolder() {
    if (!this.newFolderName) {
      alert('Please provide a name');
      return;
    }
    // Dispatch the NgRx action
    this.store.dispatch(FolderActions.addFolder({
      folder: {
        name: this.newFolderName,
        userId: this.userId!,
        parentId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Folder
    }));

    // Optionally reset UI state
    this.newFolderName = '';
    this.closeModal();
  }


  cancelFolder() {
    this.closeModal();
  }

  // FILE UPLOAD
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  saveFile() {
    console.log('Saving file:', this.selectedFile, 'into folderId:', this.selectedFolderId);
    // TODO: integrate your file creation logic here (FileService createFile, etc.)
    this.closeModal();
  }

  cancelFile() {
    this.closeModal();
  }

}
