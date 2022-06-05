import { useEffect, useState } from 'react'
import { utilService } from '../../../services/util.service.js'
import checklistIcon from '../../../assets/icon/checklist-icon.png'
import threeDotsMenu from '../../../assets/icon/three-dot-menu.svg'
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/board.action'
import { useRouteMatch } from 'react-router-dom';
import { ProgressBar } from './progress-bar'
    ;

export const TaskChecklist = (props) => {
    const { params: { boardId, groupId } } = useRouteMatch()
    const { task } = props
    const dispatch = useDispatch()
    const [isAddingItem, setIsAddingItem] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(null)
    const [itemTitle, setItemTitle] = useState('')
    const [isDeleteModalOpen, setDeleteModal] = useState(false)
    const [initialTitle, setTitle] = useState(props.checklistName)

    useEffect(() => {
        if (initialTitle === false) setTitle(task.checklist.title)
    }, [])


    const titleStyle = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '33px'
    }

    const dispatchTask = (newTask) => {
        dispatch(updateTask(boardId, groupId, newTask))
    }

    if (!task.checklist) {
        const newTask = { ...task }
        newTask.checklist = {
            title: 'Checklist',
            id: utilService.makeId(),
            todos: []
        }
        dispatchTask(newTask)
    }

    const toggleAddItem = () => {
        setIsAddingItem(!isAddingItem)
    }

    const onHandleChange = (ev, todoId) => {
        const newTask = { ...task }
        const { value } = ev.target
        setItemTitle(value)
        newTask.checklist.todos.map(todo => {
            if (todo.id === todoId) {
                todo.title = value
            }
            return todo
        })
    }
    const onHandleChangeTitle = (ev) => {
        const newTask = { ...task }
        const { value } = ev.target
        console.log(value)
        setItemTitle(value)
        newTask.checklist.title = value

    }

    const onCheck = (todoId) => {
        const newTask = JSON.parse(JSON.stringify(task))
        const newTodos = newTask.checklist.todos.map(todo => {
            if (todo.id === todoId) {
                todo.isDone = !todo.isDone
            }
            return todo
        })
        newTask.checklist.todos = newTodos
        console.log(newTask)
        dispatchTask(newTask)
    }

    const onDeleteTodo = (todoId) => {
        const todoIdx = task.checklist.todos.findIndex(todo => {
            return todo.id === todoId
        })
        const newTask = JSON.parse(JSON.stringify(task))
        newTask.checklist.todos.splice(todoIdx, 1)
        dispatchTask(newTask)
        setDeleteModal(false)
    }

    const onAddTodo = (ev) => {
        if (!itemTitle) return
        setIsAddingItem(false)
        const newTask = JSON.parse(JSON.stringify(task))
        const newTodo = {
            title: itemTitle,
            id: utilService.makeId(),
            isDone: false
        }
        const newTodos = [...newTask.checklist.todos, newTodo]
        newTask.checklist.todos = newTodos
        console.log(newTask)
        dispatchTask(newTask)
    }

    const onSaveName = (todoId) => {
        const newTask = JSON.parse(JSON.stringify(task))
        const newTodos = newTask.checklist.todos.map(todo => {
            if (todo.id === todoId) {
                todo.title = itemTitle
            }
            return todo
        })
        newTask.checklist.todos = newTodos
        console.log(newTask)
        dispatchTask(newTask)
        setItemTitle('')
    }

    const onSaveHeader = (ev) => {
        if (ev) ev.preventDefault()
        const newTask = { ...task }
        newTask.checklist.title = itemTitle
        dispatchTask(newTask)
        setItemTitle('')
    }

    const getPrecentage = () => {
        const done = task.checklist.todos.filter(todo => todo.isDone === true)
        if (!task.checklist.todos.length) return done.length
        return (Math.floor((100 * done.length) / task.checklist.todos.length))
    }



    if (task.checklist) return (
        <div>
            <div onClick={() => setIsEditTitle('header')} className="details-header flex cl-header">
                <img src={checklistIcon} alt="" className='checklist-icon' />
                <form onBlur={onSaveHeader} onSubmit={(ev) => onSaveHeader()}>
                    <input style={isEditTitle === 'header' ? { titleStyle } : {}} value={initialTitle} onChange={(ev) => onHandleChangeTitle(ev)} className="details-title cl-header" name="checklist" />
                </form>
            </div>
            <ProgressBar completed={getPrecentage()} />
            {task.checklist.todos &&
                <div>
                    {task.checklist.todos.map(todo => {
                        return <div key={todo.id} className='checklist-item'>
                            {!isEditTitle && <>
                                <div>
                                    <input type="checkbox" id={todo.id} name={todo.title} checked={todo.isDone} onChange={(ev) => onCheck(todo.id)} />
                                    <label value={todo.title} onClick={() => setIsEditTitle(todo.id)} htmlFor={todo.title}>{todo.title}</label>
                                </div>
                                <img src={threeDotsMenu} alt="more" onClick={() => setDeleteModal(todo)} /></>
                            }

                            {isEditTitle === todo.id && <div className='input-checklist'>
                                <input value={todo.title} onChange={(ev) => onHandleChange(ev, todo.id)} id={todo.id} />
                                <div>
                                    <button onClick={(ev) => setIsEditTitle(null)}>Save</button>
                                    <span className='x' onClick={() => setIsEditTitle(null)}>X</span>
                                </div>
                            </div>
                            }
                        </div>
                    })}

                </div>
            }
            {isDeleteModalOpen && <div className="delete-modal">
                Are you sure you want to delete {isDeleteModalOpen.title}?
                <div>
                    <button onClick={() => onDeleteTodo(isDeleteModalOpen.id)}>Yes</button>
                    <button onClick={() => setDeleteModal(false)}>Cancel</button>
                </div>
            </div>}
            {!isAddingItem && <button className='add-todo' onClick={toggleAddItem}>Add an item</button>}
            {isAddingItem && <div className='add-input'>
                <input onSubmit={(ev) => onAddTodo(ev)} onChange={(ev) => onHandleChange(ev)} />
                <div>
                    <button onClick={onAddTodo}>Add</button><span onClick={toggleAddItem}>Cancel</span>
                </div>
            </div>
            }

        </div>

    )

}



