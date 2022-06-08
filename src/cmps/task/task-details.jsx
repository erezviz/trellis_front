import * as React from 'react';
import { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { boardService } from '../../services/board.service';
import { ReactComponent as Close } from '../../assets/icon/close.svg'
import { ReactComponent as LabelsIcon } from '../../assets/icon/labels-icon.svg'
import { ReactComponent as TitleIcon } from '../../assets/icon/task-title-icon.svg'
import { ReactComponent as DatesIcon } from '../../assets/icon/dates-icon.svg'

import { ReactComponent as DescIcon } from '../../assets/icon/description-icon.svg'
import { ReactComponent as Plus } from '../../assets/icon/plus-icon.svg'

import { TaskMembers } from './task-members';
import { Labels } from './labels';
import { TaskChecklist } from './checklist/task-checklist.jsx'
import { updateTask } from '../../store/board.action';
import { TrellisSpinner } from '../util-cmps/trellis-spinner';
import { Attachments } from './attachments';
import { TaskDate } from './task-dates';
import { PopOver } from '../dynamic-cmps/pop-over';
import { CreateAttachment } from './attachments/create-attachment';
import { ChecklistModal } from './checklist/create-checklist-modal'
import { CoverModal } from './cover-modal.jsx'


export const TaskDetails = (props) => {

    const { currBoard } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()
    let { params: { boardId, groupId, taskId } } = useRouteMatch();

    const [task, setTask] = useState(null)
    const [isDesc, setIsDesc] = useState(false)
    let [isEdit, setIsEdit] = useState(false)
    const [isDescEdit, setIsDescEdit] = useState(false)
    let [isLabelOpen, setIsLabelOpen] = useState(false)
    const [isAttachOpen, setIsAttachOpen] = useState(false)
    const [isChecklistOpen, setIsChecklistOpen] = useState(false)
    const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false)
    const [isMembersOpen, setIsMembersOpen] = useState(false)
    let [isDatesOpen, setIsDatesOpen] = useState(false)
    const [coverModal, setCoverModal] = useState(false)

    useEffect(() => {
        const task = boardService.getTask(currBoard, groupId, taskId)
        setTask(task)
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
        if (!task.title) return
        dispatch(updateTask(boardId, groupId, task))
        setIsDesc(false)
    }

    const onDescResize = ev => {
        let desc = ev.target
        desc.style.height = ''
        desc.style.height = desc.scrollHeight + "px"
    }

    const handleFormChange = ev => {
        const { name, value } = ev.target
        setTask(prevTask => ({ ...prevTask, [name]: value }))
    }

    const onToggleAttach = () => {
        setIsAttachOpen(prevAttachOpen => prevAttachOpen = !isAttachOpen)
    }
    const onToggleChecklistModal = () => {
        setIsChecklistModalOpen(prevChecklistModalOpen => prevChecklistModalOpen = !isChecklistModalOpen)
    }
    const onOpenChecklist = (val) => {
        setIsChecklistOpen(prevChecklistOpen => prevChecklistOpen = val)
    }

    const onToggleCover = () => {
        setCoverModal(!coverModal)
    }

    if (!task) return <><TrellisSpinner isLarge={true} /></>
    return (<>
        <section style={modalStyle} className="task-details">
            {task.cover && <div className='task-cover' style={{ backgroundColor: `${task.cover}` }}></div>}
            <div className="details-container flex">
                <button onClick={() => {

                    return props.onCloseDetails()
                }} className={`close-details-btn ${'btn-cover'}`}>
                    <span>
                        <Close style={{ width: '14px' }} />
                    </span>
                </button>
                <div onClick={() => setIsEdit(isEdit = !isEdit)} className="details-header flex">
                    <span className="task-title-icon">
                        <TitleIcon />
                    </span>
                    <form onSubmit={(ev) => onSave(ev)} >
                        <input
                            onBlur={(ev) => onSave(ev)}
                            style={isEdit ? { titleStyle } : {}}
                            value={task.title}
                            onChange={handleFormChange}
                            className="details-title"
                            name="title"
                        />
                    </form>
                </div>
                <header className="task-header">
                    {task.memberIds?.length > 0 && <div className="members">
                        <p>Members</p>
                        <div className="main-members">
                            {task.memberIds && props.members.map(member => {
                                return task.memberIds.map(memberId => {
                                    if (member._id === memberId) {
                                        return <div key={memberId} className="member-task">
                                            <img src={member.imgUrl} alt="" />
                                        </div>
                                    }
                                });
                            })}
                            <div className="add-member">
                                <span onClick={() => setIsMembersOpen(!isMembersOpen)} >
                                    <Plus />
                                </span>
                            </div>

                        </div>
                    </div>}

                    {task.labelIds?.length > 0 && <section className="labels-section">
                        <p>Labels</p>
                        <div className='flex'>
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
                            </div>
                            <div className="add-label">
                                <span onClick={() => setIsLabelOpen(true)} >
                                    <Plus />
                                </span>
                            </div>
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
                            <div className="desc-label-container flex">

                                <span className="task-description-icon">
                                    <DescIcon />
                                </span>
                                <label className="description" htmlFor="description">Description</label>
                            </div>
                            {!task.description && <div
                                onClick={() => {
                                    setIsDescEdit(!isDescEdit)
                                    setIsDesc(!isDesc)
                                }}
                                className={`desc-empty btn btn-light `}
                                style={{ display: `${isDescEdit ? 'none' : 'flex'}` }}
                            >
                                <span> Add a more detailed description...</span>
                            </div>}
                            <form className="edit-description" onSubmit={onSave}>
                                <textarea
                                    onFocus={() => setIsDesc(true)}

                                    onInput={onDescResize}
                                    onChange={handleFormChange}
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="10"
                                    value={task.description}
                                    placeholder="Add a more detailed description..."
                                    style={{ display: `${(task.description || isDescEdit) ? 'initial' : 'none'}` }}
                                />
                                {isDesc && <div className="desc-controls">
                                    <input
                                        className="desc-send-btn"
                                        type="submit"
                                        value="Send"
                                    />
                                    <input
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => setIsDesc(!isDesc)}
                                        value="Cancel"
                                    />

                                </div>}
                            </form>
                        </div>
                        <Attachments
                            task={task}
                            handleChange={handleFormChange}
                        />
                        {(isChecklistOpen || task.checklist) &&
                            <div className='checklist'>
                                <TaskChecklist
                                    checklistName={isChecklistOpen}
                                    onSave={onSave}
                                    task={task}
                                    handleFormChange={handleFormChange}
                                />
                            </div>}
                    </section>
                    <section className="details-sidebar">
                        <div className="main-add-actions">
                            <h6 className="sidebar-add-heading">Add to card</h6>
                            <div className="sidebar-btn flex" onClick={() => setIsMembersOpen(!isMembersOpen)} >
                                <span className="sidebar-icon members"></span>
                                <span>Members</span>
                            </div>
                            <div onClick={() => setIsLabelOpen(true)} className="sidebar-btn flex">

                                <span className="sidebar-icon svg-icon flex ">
                                    <LabelsIcon />
                                </span>
                                <span>Labels</span>

                            </div>
                            <div onClick={() => onToggleAttach()} className="sidebar-btn flex">
                                <span className="sidebar-icon attachment-icon"></span>
                                <span>Attachments</span>
                            </div>
                            <div onClick={() => onToggleChecklistModal()} className="sidebar-btn flex">
                                <span className="sidebar-icon checklist-icon"></span>
                                <span>Checklist</span>
                                {/* {isChecklistModalOpen && */}
                            </div>
                            <div onClick={() => setIsDatesOpen(true)} className="sidebar-btn flex">
                                <span className="siderbar-icon dates-icon flex">
                                    <DatesIcon style={{ width: '12px' }} />
                                    <span>
                                        Dates
                                    </span>
                                </span>
                            </div>
                            <div onClick={() => onToggleCover()} className="sidebar-btn flex">
                                <span className="sidebar-icon cover-icon"></span>
                                <span>Cover</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <PopOver cb={onToggleChecklistModal} isShown={isChecklistModalOpen} title={'Create checklist'}>
                <ChecklistModal onClose={onToggleChecklistModal} onOpenChecklist={onOpenChecklist} />
            </PopOver>
            <PopOver cb={onToggleCover} isShown={coverModal} title={'Add cover'}>
                <CoverModal boardId={boardId} groupId={groupId} task={task} />
            </PopOver>
            <CreateAttachment cb={onToggleAttach} isShown={isAttachOpen} task={task} />
            {(currBoard.labels && isLabelOpen) && <Labels onToggleLabels={setIsLabelOpen} task={task} labels={currBoard.labels} />}
            {isDatesOpen && <TaskDate onToggleDates={setIsDatesOpen} task={task} />}
            {isMembersOpen && <TaskMembers onToggleMembers={setIsMembersOpen} task={task} members={currBoard.members} />}
        </section>
    </>
    )
}
