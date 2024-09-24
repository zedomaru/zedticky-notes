import { Plus } from '../assets/icons/Plus';
import colors from '../assets/colors.json';
import { useContext, useRef } from 'react';
import { db } from '../appwrite/databases';
import { NoteContext } from '../context/NoteContext';
import { NoteType } from '../entities/note/NoteEntity';
import { useAuth } from '../context/AuthContext';
import { Query } from 'appwrite';

export const AddButton = () => {
  const startingPos = useRef(10);
  const { setNotes } = useContext(NoteContext);
  const { user } = useAuth();
  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
      userId: user?.$id,
    };
    startingPos.current += 10;
    await db.notes.create(payload);
    const response = await db.notes.list([Query.equal('userId', user?.$id)]);
    const docs = response.documents as NoteType[];
    setNotes(docs);
  };
  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};
