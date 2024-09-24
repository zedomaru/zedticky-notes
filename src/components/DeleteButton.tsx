import Trash from '../assets/icons/Trash';
import { db } from '../appwrite/databases';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { NoteType } from '../entities/note/NoteEntity';
import { Query } from 'appwrite';
import { useAuth } from '../context/AuthContext';

type Props = {
  noteId: string;
};

const DeleteButton = ({ noteId }: Props) => {
  const { setNotes } = useContext(NoteContext);
  const { user } = useAuth();
  const handleDelete = async () => {
    await db.notes.delete(noteId);
    const response = await db.notes.list([Query.equal('userId', user?.$id)]);
    const docs = response.documents as NoteType[];
    setNotes(docs);
  };
  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
