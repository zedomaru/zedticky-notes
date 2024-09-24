import { RefObject, useContext } from 'react';
import { Position } from '../entities/base/BaseEntity';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type newOffsetType = {
  card: RefObject<HTMLDivElement>;
  mouseMoveDir?: Position;
};

export const setNewOffset = ({
  card,
  mouseMoveDir = { x: 0, y: 0 },
}: newOffsetType): Position => {
  if (!card.current) {
    return {
      x: 0,
      y: 0,
    };
  }
  const offsetLeft = card.current.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.current.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const autoGrow = (textAreaRef: RefObject<HTMLTextAreaElement>) => {
  const { current } = textAreaRef;
  if (current) {
    current.style.height = 'auto';
    current.style.height = current.scrollHeight + 'px';
  }
};

export const setZIndex = (selectedCard: RefObject<HTMLDivElement>) => {
  if (selectedCard.current) {
    selectedCard.current.style.zIndex = '999';
    Array.from(document.getElementsByClassName('card')).forEach((card) => {
      const cardElement = card as HTMLDivElement;
      if (cardElement !== selectedCard.current && selectedCard.current) {
        cardElement.style.zIndex = (
          parseInt(selectedCard.current.style.zIndex) - 1
        ).toString();
      }
    });
  }
};

export const bodyParser = (body: string | unknown) => {
  try {
    return JSON.parse(body as string);
  } catch (error) {
    return body;
  }
};

export const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};
