import React from 'react';
import { Button } from 'antd';

interface IBtnProps {
  onClick: () => void;
  type?: 'text' | 'link' | 'ghost' | 'primary' | 'dashed';
  text: string;
}

const Btn = ({ onClick, type, text }: IBtnProps) => {
  return (
    <Button onClick={onClick} type={type}>
      {text}
    </Button>
  );
};

export default Btn;
