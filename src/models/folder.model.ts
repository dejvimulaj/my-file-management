export interface Folder {
  id?: number;
  name: string;
  parentId?: number | null;
  createdAt?: string;  // or Date
  updatedAt?: string;
}
