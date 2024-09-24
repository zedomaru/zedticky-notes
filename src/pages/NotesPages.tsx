import NoteCard from '../components/NoteCard';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import Controls from '../components/Controls';
import LogoutButton from '../components/LogoutButton';

const NotesPages = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      <LogoutButton />
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPages;
