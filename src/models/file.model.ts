export interface File {
  id?: number;
  name: string;
  folderId: number;
  fileType: string;
  fileSize: number;
  createdAt?: string;
  updatedAt?: string;
}
