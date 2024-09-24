import { ID, Models } from 'appwrite';
import { collections, databases } from './config';
import { DBType } from '../entities/appwrite/AppwriteType';

const db: DBType = {};

collections.forEach((collection) => {
  db[collection.name] = {
    create: async (payload, id = ID.unique()): Promise<Models.Document> => {
      return await databases.createDocument(
        collection.dbId,
        collection.id,
        id,
        payload
      );
    },
    update: async (id, payload): Promise<Models.Document> => {
      return await databases.updateDocument(
        collection.dbId,
        collection.id,
        id,
        payload
      );
    },
    delete: async (id): Promise<void> => {
      await databases.deleteDocument(collection.dbId, collection.id, id);
    },
    get: async (id): Promise<Models.Document> => {
      return await databases.getDocument(collection.dbId, collection.id, id);
    },
    list: async (
      queries?: string[]
    ): Promise<Models.DocumentList<Models.Document>> => {
      return await databases.listDocuments(
        collection.dbId,
        collection.id,
        queries
      );
    },
  };
});

export { db };
