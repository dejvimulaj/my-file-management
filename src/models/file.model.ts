export interface File {
  id?: number;
  name: string;
  folderId: number;
  userId: number;
  fileType: string;
  fileSize: number;
  createdAt?: string;
  updatedAt?: string;
}
