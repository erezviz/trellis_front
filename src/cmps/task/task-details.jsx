
import * as React from 'react';
import { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { TaskTitle } from '../dynamic-cmps/task-title';
import { boardService } from '../../services/board.service';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { queryTask, updateTask } from '../../store/board.action';
import { useSelector } from 'react-redux';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';




export const TaskDetails = (props) => {
    const [isDesc, setIsDesc] = useState(false)
    let [isEdit, setIsEdit] = useState(false)
    let [title, setTitle] = useState({ title: '' })
    let [task, setTask] = useState(null)
    const dispatch = useDispatch()
    const { currBoard } = useSelector((storeState) => storeState.boardModule)
    let history = useHistory()
    // let { boardId, groupId, taskId } = useParams()
    let { params: { boardId, groupId, taskId } } = useRouteMatch();



    useEffect(() => {

        (async () => {
            const newtask = await dispatch(queryTask(boardId, groupId, taskId))

            setTask(newtask)

        })();

        return () => {
            setTask(null)
        }
    }, [])

    const modalStyle = {
        display: props.isOpen ? 'block' : 'none',
        position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',

        bgcolor: 'background.paper',
        // border: '2px solid #000',
        // boxShadow: 24,
        // pt: 2,
        // px: 4,
        // pb: 3,

    }
    const titleStyle = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '33px'
    }
    // TODO work on a function to save the title of the task in the task.
    // TODO this function will need to dispatch to the state and update the task in the JSON file.
    async function onSave(ev) {
        ev.preventDefault()
        const updatedBoard = await dispatch(updateTask(boardId, groupId, task))
        console.log('updatedboad inside onSave', updatedBoard);
    }

    const handleFormChange = ev => {
        const { name, value } = ev.target

        setTask(prevTask => ({ ...prevTask, [name]: value }))
    }
    const goBack = () => {
        this.props.history.push(`/board/${boardId}`)
    }
    if (!task) return <>Loading...</>
    return (

        <section style={modalStyle} className="task-details">
            <div className="details-container flex">


                <button onClick={(ev) => {
                    // return goBack()
                    return props.onToggleDetails()
                }} className="close-details-btn">X</button>
                <div onClick={() => setIsEdit(isEdit = !isEdit)} className="details-header flex">
                    <form onSubmit={(ev) => onSave(ev)} >
                        <textarea style={isEdit ? { titleStyle } : {}} value={task.title} onChange={handleFormChange} className="details-title" name="title" id="" cols="30" rows="10" />
                        <input type="submit" value="Submit" />
                    </form>
                    {/* <div contentEditable="true" className="details-title">
                    This is the Title
                </div> */}
                </div>

                <div className="details-contents flex">
                    <label htmlFor="description">Description</label>
                    <section className="details-main-col flex">
                        {isDesc && <div onClick={() => setIsDesc(true)} className="details-desc">
                            {task.description && <p>{task.description}</p>}

                        </div>}

                        <form onSubmit={onSave}>
                            <textarea
                                onChange={handleFormChange}
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                value={task.description}
                                placeholder="Add a more detailed description..."
                            />
                            <input type="submit" value="Desc" />
                        </form>


                    </section>

                    <section className="details-sidebar">
                        <div className="main-add-actions">
                            <h3 className="sidebar-add-heading"> </h3>
                            <div>
                                Labels
                            </div>
                            <div>
                                Attachments
                            </div>
                            <div>
                                Checklist
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </section>
    )
}




