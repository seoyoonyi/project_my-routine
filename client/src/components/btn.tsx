import { Button } from 'antd'

interface IBtnProps {
  onClick?: () => void
  type?: 'text' | 'link' | 'ghost' | 'primary' | 'dashed'
  children: React.ReactNode
}

const Btn = ({ onClick, type, children }: IBtnProps) => {
  return (
    <Button onClick={onClick} type={type}>
      {children}
    </Button>
  )
}

export default Btn
