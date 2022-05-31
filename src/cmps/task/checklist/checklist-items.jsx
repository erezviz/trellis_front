import { React, useEffect, useState } from "react"
import { utilService } from "../../../services/util.service"
import { ProgressBar } from './progress-bar.jsx'
import threeDotsMenu from '../../../assets/icon/three-dot-menu.svg'
import { display, style } from "@mui/system"

export const ChecklistItems = (props) => {
    let [isEdit, setIsEdit] = useState(false)
    let [isEditTitle, setIsEditTitle] = useState(null)
    let [isDeleteModalOpen, setDeleteModal] = useState(false)
    let [title, setTitle] = useState('')
    let [todoTitle, setTodoTitle] = useState('')
    let [todos, setTodos] = useState(props.todos)

    useEffect(() => {
        props.onChangeTodos(todos)
    }, [todos])

    const onHandleTodoName = (ev) => {
        const { value } = ev.target
        setTitle(value)
    }

    const onCancel = () => {
        reset()

    }

    const onSubmitTodo = async(ev) => {
        ev.preventDefault()
        const newTodo = {
            id: utilService.makeId(),
            title,
            isDone: false
        }
        try{
            if(!todos){
            setTodos([newTodo])
            await props.onSave()
        } else{
            const newTodos = [...todos, newTodo] 
            console.log('onSubmit newTodos', newTodos)
               setTodos(newTodos)
               await props.onSave()
            }
            reset()
        }catch(err){
            throw err
        }
    }

    const onCheck = (todoId) => {
        const uptadedTodos = todos.map(todo => {
            if (todoId === todo.id) todo.isDone = !todo.isDone
            return todo
        })
        setTodos((prevTodos) => (prevTodos = uptadedTodos))
        props.onSave()
    }
    const getPrecentage = () => {
        const done = todos.filter(todo => todo.isDone === true)
        if(!todos.length) return done.length
        return (Math.floor((100 * done.length) / todos.length))
    }

    const reset = () => {
        setIsEdit(false)
        setTitle('')
    }

    const onEditTodo = (todoId) => {
        setIsEditTitle(todoId)
    }

    const onCancelEdit = () => {
        setIsEditTitle(false)

    }

    const handleTitleChange = (ev) => {
        const { value } = ev.target
        setTodoTitle(value)

    }

    const onSaveName = (todoId) => {
        const uptadedTodos = todos.map(todo => {
            if (todoId === todo.id) todo.title = todoTitle
            return todo
        })
        setTodos((prevTodos) => {(prevTodos = uptadedTodos)
            props.onSave()
        })
        setTodoTitle('')
        setIsEditTitle(false)
    }

    const onDeleteTodo =async(todoId) => {
        const newtodos = todos.filter(todo => {
            return todo.id !== todoId
        })
        // debugger
        setTodos(newtodos)
        props.onSave()
        console.log('new todos',todos)
        setDeleteModal(false)
    }

    return (
        <div>
            <ProgressBar completed={getPrecentage()} />
            {todos && todos.map(todo => {
                return <div key={todo.id} className="checklist-item">
                    <input type="checkbox" id={todo.id} name={todo.title} checked={todo.isDone} onChange={(ev) => {onCheck(todo.id) 
                        props.onSave(ev)}} />
                    <label onClick={()=>onEditTodo(todo.id) } htmlFor={todo.title}>{todo.title}</label>
                    <img src={threeDotsMenu} alt="more" onClick={() => setDeleteModal(!isDeleteModalOpen)} />
                    {isDeleteModalOpen && <div className="delete-modal">
                        <p>Are you sure you want to</p>
                        <p> delete {todo.title}?</p>
                        <button onClick={() => setDeleteModal(false)}>X</button>
                        <button onClick={(ev) => {onDeleteTodo(todo.id)
                        props.onSave(ev)}
                        }>Yes</button>
                    </div>}
                    {isEditTitle === todo.id && <>
                        <input onChange={(ev) => handleTitleChange(ev)} id={todo.id} />
                        <button onClick={(ev) => {onSaveName(todo.id)
                        props.onSave(ev)}}>Save</button>
                        <button onClick={onCancelEdit}>Cancel</button>
                    </>
                    }
                </div>
            })}
            {!isEdit && <button onClick={() => setIsEdit(!isEdit)}>Add an item</button>}
            {isEdit && <form onSubmit={(ev)=>{onSubmitTodo(ev)
            console.log('ev',ev)
            props.onSave(ev)}
            }>
                <input onChange={(ev) => onHandleTodoName(ev)} />
                <button onClick={onSubmitTodo}>Add</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>}
        </div>
    )
}