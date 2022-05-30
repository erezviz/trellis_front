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
    }else initialChecklist = props.checklist

    
    const [checklist, setChecklist] = useState(initialChecklist)
    
    // useEffect(()=>{
    // },[checklist])
    
    
    const onChangeTitle = (newTitle)=>{
        setChecklist(prevChecklist=>({...prevChecklist, title: newTitle}))
        props.handleFormChange({target:{name: 'checklist', value: checklist}})
        console.log('checklist from task-checklist',checklist)
        // props.onSave()
    }
    
    const onChangeTodos=(newTodos)=>{
        setChecklist(prevChecklist=>({...prevChecklist, todos: newTodos}))
        props.handleFormChange({target:{name: 'checklist', value: checklist}})
        console.log('checklist from task-checklist',checklist)
        // props.onSave()
    }

    return (
        <>
        <ChecklistHeader onSave={props.onSave} onChangeTitle={onChangeTitle} task={props.task} title={checklist.title} />
        <ChecklistItems onSave={props.onSave} onChangeTodos={onChangeTodos} todos={checklist.todos}/>
        </>
    )

}