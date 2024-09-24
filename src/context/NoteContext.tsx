import { createContext, ReactNode, useEffect, useState } from 'react';
import Spinner from '../assets/icons/Spinner';
import { NoteType } from '../entities/note/NoteEntity';
import { db } from '../appwrite/databases';
import { Query } from 'appwrite';
import { useAuth } from './AuthContext';

interface NoteContextType {
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  selectedNote: NoteType | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
}

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  setNotes: () => {},
  selectedNote: null,
  setSelectedNote: () => {},
});

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      init();
    }
  }, [user]);
  const init = async () => {
    setNotes([]);
    const response = await db.notes.list([Query.equal('userId', user?.$id)]);
    const docs = response.documents as NoteType[];
    setNotes(docs);
    setLoading(false);
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };
  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
