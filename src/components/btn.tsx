interface IBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}
const Btn = ({ onClick, text }: IBtnProps) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Btn;
