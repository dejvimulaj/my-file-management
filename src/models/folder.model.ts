export interface Folder {
  id?: number;
  name: string;
  userId?: number;
  parentId?: number | null;
  createdAt?: string;  // or Date
  updatedAt?: string;
}
