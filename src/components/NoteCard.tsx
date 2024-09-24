import { useContext, useEffect, useRef, useState } from 'react';
import { Colors, Position } from '../entities/base/BaseEntity';
import { NoteType } from '../entities/note/NoteEntity';
import { autoGrow, bodyParser, setNewOffset, setZIndex } from '../utils';
import { db } from '../appwrite/databases';
import Spinner from '../assets/icons/Spinner';
import DeleteButton from './DeleteButton';
import { NoteContext } from '../context/NoteContext';

type NoteProps = {
  note: NoteType;
};

const NoteCard = ({ note }: NoteProps) => {
  const [position, setPosition] = useState<Position>(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const colors: Colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const keyUpTimer = useRef<any>(null);
  const { setSelectedNote } = useContext(NoteContext);
  let mouseStartPosition: Position = { x: 0, y: 0 };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef);
  }, []);

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    const newPosition = setNewOffset({ card: cardRef });
    saveData('position', newPosition);
  };

  const saveData = async (key: string, value: any) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.className === 'card-header') {
      setZIndex(cardRef);
      mouseStartPosition.x = e.clientX;
      mouseStartPosition.y = e.clientY;
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e: MouseEvent) => {
    let mouseMoveDir = {
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY,
    };

    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    const newPosition = setNewOffset({ card: cardRef, mouseMoveDir });
    setPosition(newPosition);
  };

  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current = setTimeout(() => {
      saveData('body', textAreaRef.current?.value);
    }, 2000);
  };

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
};

export default NoteCard;
