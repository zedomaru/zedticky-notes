import { Models } from 'appwrite';

export type CollectionsType = {
  name: string;
  id: string;
  dbId: string;
};

export type DBType = {
  [key: string]: {
    create: (payload: any, id?: string) => Promise<Models.Document>;
    update: (id: string, payload: any) => Promise<Models.Document>;
    delete: (id: string) => Promise<void>;
    get: (id: string) => Promise<Models.Document>;
    list: (queries?: string[]) => Promise<Models.DocumentList<Models.Document>>;
  };
};
