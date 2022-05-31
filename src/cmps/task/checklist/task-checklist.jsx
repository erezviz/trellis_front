import { useEffect, useState } from 'react'
import { utilService } from '../../../services/util.service.js'
import {ChecklistHeader} from './checklist-header.jsx'
import {ChecklistItems} from './checklist-items.jsx'

export const TaskChecklist = (props) => {
    let initialChecklist
    if (!props.checklist){
        initialChecklist = {
            title: 'checklist', 
            id: utilService.makeId(),
            todos:[]
        }
    }else initialChecklist = props.task.checklist

    const [task, setTask] = useState(props.task)
    const [checklist, setChecklist] = useState(initialChecklist)
    // console.log('task checklist', task)
    useEffect(()=>{
        // console.log('checklist change!', checklist)
        setTask(prevTask=>({...prevTask, checklist:checklist}))
        // console.log('did task changed?', task)
        props.onSave(null,task)
    },[checklist])
    

    const onChangeTitle = (newTitle)=>{
        setChecklist(prevChecklist=>({...prevChecklist, title: newTitle}))
        setTask(prevTask=>({...prevTask, checklist:checklist}))
    }
    
    const onChangeTodos=async(newTodos)=>{
        setChecklist(prevChecklist=>({...prevChecklist, todos: newTodos}))
        setTask(prevTask=>({...prevTask, checklist:checklist}))
        // props.handleFormChange({target:{name: 'checklist', value: checklist}})
        // console.log('checklist from task-checklist',checklist)
        // props.onSave()
    }

    return (
        <>
        <ChecklistHeader onSave={props.onSave} onChangeTitle={onChangeTitle} task={props.task} title={checklist.title} />
        <ChecklistItems onSave={props.onSave} onChangeTodos={onChangeTodos} todos={checklist.todos}/>
        </>
    )

}