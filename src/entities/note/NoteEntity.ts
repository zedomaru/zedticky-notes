import { Models } from 'appwrite';

export interface NoteType extends Models.Document {
  $id: string;
  body: string;
  colors: string;
  position: string;
}
