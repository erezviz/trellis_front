
import * as React from 'react';
import { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import { TaskTitle } from '../dynamic-cmps/task-title';
// import { boardService } from '../../services/board.service';
import { TaskChecklist } from './checklist/task-checklist.jsx'
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import member from '../../assets/icon/member.svg'
import { useSelector } from 'react-redux';
import { Labels } from './labels';
import { queryTask, updateTask } from '../../store/board.action';
// import { useSelector } from 'react-redux';

import { TrellisSpinner } from '../util-cmps/trellis-spinner';
import { Attachments } from './attachments';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';




export const TaskDetails = (props) => {
    const [isDesc, setIsDesc] = useState(false)
    let [isEdit, setIsEdit] = useState(false)
    // let [title, setTitle] = useState({ title: '' })
    let [task, setTask] = useState(null)
    const dispatch = useDispatch()
    // const { currBoard } = useSelector((storeState) => storeState.boardModule)
    // let history = useHistory()
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

    async function onSave(ev, newTask) {
        if (ev) {
            ev.preventDefault()
        
        }
        console.log('task before dispatch', task)
        await dispatch(updateTask(boardId, groupId, task))


    }

    const handleFormChange = ev => {
        const { name, value } = ev.target
        setTask(prevTask => ({ ...prevTask, [name]: value }))
        console.log('saveTask task-details', task)
    }
    const goBack = () => {
        this.props.history.push(`/board/${boardId}`)
    }



    if (!task) return <><TrellisSpinner isLarge={true} /></>

    return (

        <section style={modalStyle} className="task-details">
            <div className="details-container flex">

                <button onClick={(ev) => {
                    // return goBack()
                    return props.onCloseDetails()
                }} className="close-details-btn">X</button>
                <div onClick={() => setIsEdit(isEdit = !isEdit)} className="details-header flex">
                    <form onSubmit={(ev) => onSave(ev)} >
                        <input onBlur={(ev) => onSave(ev)} style={isEdit ? { titleStyle } : {}} value={task.title} onChange={handleFormChange} className="details-title" name="title" />

                    </form>
                    {/* <div contentEditable="true" className="details-title">
                    This is the Title
                </div> */}
                </div>
                <header className="task-header">

                    <div className="members">
                        <p>Members</p>
                        <div className="main-members">
                            <div className="member-icon">
                                <img src={member} alt="" />
                            </div>
                            <div className="add-member">+</div>
                        </div>
                    </div>

                    <section className="labels-section">
                        <p>Labels</p>
                        <div className="labels-list">
                            {task.labelIds && props.labels.map(label => {
                                return task.labelIds.map(labelId => {
                                    if (label.id === labelId) {
                                     
                                        return <div className="label-task" style={{ backgroundColor: label.color }}>
                                            <span>{label.title}</span>
                                        </div>
                                    }
                                });
                            })}
                        </div>
                    </section>
                </header>




                <div className="details-contents flex">
                    <section className="details-main-col flex">
                        <div className="desc-container">
                            <label className="description" htmlFor="description">Description</label>
                            {isDesc && <div onClick={() => setIsDesc(true)} className="details-desc">
                                {task.description && <p>{task.description}</p>}

                            </div>}

                            <form onSubmit={onSave}>
                                <textarea
                                    onBlur={(ev) => onSave(ev)}
                                    onChange={handleFormChange}
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="10"
                                    value={task.description}
                                    placeholder="Add a more detailed description..."
                                />

                                <input className='desc-send-btn' type="submit" value="Send" />
                            </form>
                        </div>
                        <Attachments handleChange={handleFormChange} />

                        <div className='checklist'><TaskChecklist onSave={onSave} task={task} handleFormChange={handleFormChange} /></div>

                    </section>

                    <section className="details-sidebar">
                        <div className="main-add-actions">

                            <h6 className="sidebar-add-heading">Add to card</h6>
                            <div onClick={() => props.onToggleLabels()} className="sidebar-btn">
                                Labels
                            </div>
                            <div className="sidebar-btn">
                                Attachments

                            </div>
                            <div className="sidebar-btn">
                                Checklist
                            </div>
                        </div>
                    </section>
                </div>

            </div>

        </section>
    )
}




