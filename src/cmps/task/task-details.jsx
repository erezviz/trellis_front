import * as React from 'react';
import { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { boardService } from '../../services/board.service';

import { ReactComponent as TitleIcon } from '../../assets/icon/task-title-icon.svg'
import member from '../../assets/icon/member.svg'

import { TaskMembers } from './task-members';
import { Labels } from './labels';

import { TaskChecklist } from './checklist/task-checklist.jsx'
import { queryTask, updateTask } from '../../store/board.action';
import { TrellisSpinner } from '../util-cmps/trellis-spinner';
import { Attachments } from './attachments';
import { TaskDate } from './task-dates';
// import { PopOver } from '../dynamic-cmps/pop-over';
import { CreateAttachment } from './attachments/create-attachment';


export const TaskDetails = (props) => {

    const { currBoard } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    const [task, setTask] = useState(null)
    const [isDesc, setIsDesc] = useState(false)
    let [isEdit, setIsEdit] = useState(false)
    let [isLabelOpen, setIsLabelOpen] = useState(false)
    const [isAttachOpen, setIsAttachOpen] = useState(false)
    const [isMembersOpen, setIsMembersOpen] = useState(false)
    let [isDatesOpen, setIsDatesOpen] = useState(false)


    // let { boardId, groupId, taskId } = useParams()
    let { params: { boardId, groupId, taskId } } = useRouteMatch();
    useEffect(() => {
        (async () => {
            const task = boardService.getTask(currBoard, groupId, taskId)
            // console.log('task from details', task);
            // const newtask = await dispatch(queryTask(boardId, groupId, taskId))
            setTask(task)
        })();
        return () => {
            setTask(null)
        }
    }, [currBoard])

    const modalStyle = {
        display: props.isOpen ? 'block' : 'none',
        position: 'absolute',
        bgcolor: 'background.paper',
    }
    const titleStyle = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '33px'
    }

    function onSave(ev) {
        if (ev) {
            ev.preventDefault()
        }

        // console.log('task before dispatch', task)
        dispatch(updateTask(boardId, groupId, task))
        setIsDesc(false)


    }

    const onDescResize = ev => {
        let desc = ev.target
        desc.style.height = ''
        //     textarea.style.height = "";
        //     /* textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px"; */
        desc.style.height = desc.scrollHeight + "px"

    }
   

    const handleFormChange = ev => {
        const { name, value } = ev.target
        setTask(prevTask => ({ ...prevTask, [name]: value }))
        // console.log('saveTask task-details', task)
    }

    const goBack = () => {
        this.props.history.push(`/board/${boardId}`)
    }

    const onToggleAttach = () => {
        setIsAttachOpen(prevAttachOpen => prevAttachOpen = !isAttachOpen)
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
                    <span className="task-title-icon">
                        <TitleIcon />
                    </span>
                    <form onSubmit={(ev) => onSave(ev)} >
                        <input onBlur={(ev) => onSave(ev)} style={isEdit ? { titleStyle } : {}} value={task.title} onChange={handleFormChange} className="details-title" name="title" />
                    </form>
                    {/* <div contentEditable="true" className="details-title">
                    This is the Title
                </div> */}
                </div>
                <header className="task-header">
                    {task.memberIds?.length > 0 && <div className="members">
                        <p>Members</p>
                        <div className="main-members">
                            {task.memberIds && props.members.map(member => {
                                return task.memberIds.map(memberId => {
                                    if (member._id === memberId) {
                                        console.log('helo from if Shani is an officer');
                                        return <div key={memberId} className="member-task">
                                            <img src={require(`../../assets/img/${member.imgUrl}`)} alt="" />
                                        </div>
                                    }
                                });
                            })}
                            <div className="add-member">
                                <span>+</span>
                            </div>

                        </div>
                    </div>}

                    {task.labelIds?.length > 0 && <section className="labels-section">
                        <p>Labels</p>
                        <div className="labels-list">
                            {task.labelIds && props.labels.map(label => {
                                return task.labelIds.map(labelId => {
                                    if (label.id === labelId) {
                                        return <div key={labelId} className="label-task" style={{ backgroundColor: label.color }}>
                                            <span>{label.title}</span>
                                        </div>
                                    }
                                });
                            })}
                            <span>+</span>
                        </div>
                    </section>}
                    {task.dueDate && <section className="show-date">
                        <p>Date</p>

                        <div className="date">
                            <input type="checkBox" />
                            <span>{task.dueDate}</span>
                        </div>
                    </section>}
                </header>
                <div className="details-contents flex">
                    <section className="details-main-col flex">
                        <div className="desc-container">
                            <label className="description" htmlFor="description">Description</label>
                            {/* {isDesc && <div onClick={() => setIsDesc(true)} className="details-desc">
                                {task.description && <p>{task.description}</p>}

                            </div>} */}

                            <form className="edit-description" onSubmit={onSave}>
                                <textarea
                                    onInput={onDescResize}
                                    onFocus={() => setIsDesc(true)}
                                    onBlur={(ev) => onSave(ev)}
                                    onChange={handleFormChange}
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="10"
                                    value={task.description}
                                    placeholder="Add a more detailed description..."
                                />
                                {isDesc && <div className="desc-controls">
                                    <input className='desc-send-btn' type="submit" value="Send" />
                                </div>}
                            </form>
                        </div>
                        <Attachments task={task} handleChange={handleFormChange} />

                        <div className='checklist'><TaskChecklist onSave={onSave} task={task} handleFormChange={handleFormChange} /></div>
                    </section>
                    <section className="details-sidebar">
                        <div className="main-add-actions">
                            <h6 className="sidebar-add-heading">Add to card</h6>
                            <div className="sidebar-btn flex" onClick={() => setIsMembersOpen(!isMembersOpen)} >
                                <span className="sidebar-icon-members"></span>
                                <span>Members</span>
                            </div>
                            <div onClick={() => setIsLabelOpen(true)} className="sidebar-btn">
                                Labels
                            </div>
                            <div onClick={() => onToggleAttach() } className="sidebar-btn">
                                Attachments
                            </div>
                            <div className="sidebar-btn">
                                Checklist
                            </div>
                            <div onClick={() => setIsDatesOpen(true)} className="sidebar-btn">
                                Dates
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            {/* <PopOver isShown={isAttachOpen} title={'Attach from...'} cb={setIsAttachOpen(false)} >
                <CreateAttachment task={task}/>
            </PopOver> */}
            {(currBoard.labels && isLabelOpen) && <Labels onToggleLabels={setIsLabelOpen} task={task} labels={currBoard.labels} />}
            {isDatesOpen && <TaskDate onToggleDates={setIsDatesOpen} task={task} />}
            {isMembersOpen && <TaskMembers onToggleMembers={setIsMembersOpen} task={task} members={currBoard.members} />}
        </section>
    )
}











