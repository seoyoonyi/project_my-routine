import React from 'react'
import { useState } from 'react'
import styles from './btn.module.css'

const Btn = () => {
  const [state, setState] = useState<boolean>(false);
  return (
    <button className={!state ? `${styles.bt} ${styles.apple}`: `${styles.bt}`} onClick={()=>setState(!state)}>버튼버튼버튼</button>
  )
}

export default Btn
