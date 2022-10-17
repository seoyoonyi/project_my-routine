import React, { useRef, useState } from 'react'
import Btn from './Btn'
import axios from 'axios'
import { IRoutineListProps } from './RoutineList'

export const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10)
}
interface IRoutineEditorProps {
  getRoutinesData: () => void
  routineToggle: () => void
}
const RoutineEditor = ({ getRoutinesData, routineToggle }: IRoutineEditorProps) => {
  const [routine, setRoutine] = useState<IRoutineListProps>({
    title: '',
    content: '',
    date: getStringDate(new Date()),
  })
  const [onDate, setOnDate] = useState(false)
  const titleInput = useRef<HTMLInputElement>(null)
  const contentInput = useRef<HTMLTextAreaElement>(null)

  const dateToggle = () => {
    setOnDate((onDate) => !onDate)
  }

  const routineSave = () => routineToggle()

  const handleChangeRoutine = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRoutine({
      ...routine,
      [e.target.name]: e.target.value,
    })
  }

  const addRoutine = async (title: string, content: string, date: string) => {
    try {
      await axios.post('http://localhost:8000/routines', {
        title,
        content,
        date,
      })
      getRoutinesData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    addRoutine(routine.title, routine.content, routine.date)
    setRoutine({
      title: '',
      content: '',
      date: getStringDate(new Date()),
    })
    routineSave()
  }

  return (
    <>
      <input ref={titleInput} name="title" value={routine.title} onChange={handleChangeRoutine} />
      <br />

      <textarea ref={contentInput} name="content" value={routine.content} onChange={handleChangeRoutine}></textarea>
      <br />
      <div>
        <Btn onClick={dateToggle}>오늘</Btn>
        {onDate ? <input type="date" name="date" onChange={handleChangeRoutine} value={routine.date} /> : null}
        <Btn onClick={handleSubmit}>루틴저장</Btn>
      </div>
    </>
  )
}

export default RoutineEditor
