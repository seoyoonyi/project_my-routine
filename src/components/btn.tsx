import React from 'react';

interface IBtnProps {
  onClick: () => void;
  text: string;
}
const Btn = ({ onClick, text }: IBtnProps) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Btn;
