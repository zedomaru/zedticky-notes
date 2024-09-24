import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { db } from '../appwrite/databases';

type ColorNav = {
  color: {
    colorHeader: string;
  };
};

const Color = ({ color }: ColorNav) => {
  const { selectedNote, notes, setNotes } = useContext(NoteContext);
  const changeColor = () => {
    try {
      const currentNotesIndex = notes.findIndex(
        (note) => note.$id === selectedNote?.$id
      );
      const updatedNote = {
        ...notes[currentNotesIndex],
        colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNotesIndex] = updatedNote;
      setNotes(newNotes);
      db.notes.update(selectedNote?.$id || '', {
        colors: JSON.stringify(color),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

export default Color;
