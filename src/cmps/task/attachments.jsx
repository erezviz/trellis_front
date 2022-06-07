import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { utilService } from "../../services/util.service"
import { updateTask } from "../../store/board.action"
import { TrellisSpinner } from "../util-cmps/trellis-spinner"
import { ReactComponent as Close } from '../../assets/icon/close.svg'



export const Attachments = ({ task }) => {

    let { params: { boardId, groupId } } = useRouteMatch()
    const dispatch = useDispatch()
    let [isEdit, setIsEdit] = useState(false)
    let [isUploading, setIsUploading] = useState(false)
    const [attachmentId, setAttachmentId] = useState(null)
    let [attachment, setAttachment] = useState({
        title: null,
        createdAt: Date.now(),
        url: null
    })

    const resetAttachment = () => {
        const emptyAttach = {
            title: null,
            createdAt: Date.now(),
            url: null
        }
        setAttachment(emptyAttach)
    }

    const handleChange = ev => {
        ev.preventDefault()

        const { value, name } = ev.target
        setAttachment(prevAttachment => ({ ...prevAttachment, [name]: value }))

    }

    const toggleEdit = (id) => {
        setIsEdit(prevIsEdit => prevIsEdit = !isEdit)
    }

    const onSaveAttachment = ev => {
        if (ev) ev.preventDefault()

        if (!attachment.title) {
            attachment.title = utilService.getFilename(attachment.url)
        }
        const newTask = utilService.getDeepCopy(task)
        attachment.id = utilService.makeId()
        if (newTask.attachments) newTask.attachments = [...newTask.attachments, attachment]
        else newTask.attachments = [attachment]
        dispatch(updateTask(boardId, groupId, newTask))
        resetAttachment()
    }

    const toggleTitle = (attachmentId) => {
        setAttachmentId(attachmentId)
        toggleEdit()
    }

    const onRemoveAttachment = (attachmentId) => {

        const newTask = utilService.getDeepCopy(task)
        const newAttachments = newTask.attachments.filter(attachment => attachment.id !== attachmentId)
        newTask.attachments = newAttachments
        dispatch(updateTask(boardId, groupId, newTask))
    }

    const onEditTitle = (ev, attachId) => {
        console.log('hi from before ev', attachment);
        if (ev) ev.preventDefault()

        const newTask = utilService.getDeepCopy(task)
        const newTitle = attachment.title
        const attachToUpdate = newTask.attachments.find(attachment => attachment.id === attachId)
        attachToUpdate.title = newTitle

        if (!attachment.title) return
        const newAttachments = newTask.attachments.map(prevAttachment => {
            return (prevAttachment.id === attachToUpdate.id) ? attachToUpdate : prevAttachment
        })
        console.log('newAttachments', newAttachments);
        newTask.attachments = newAttachments
        dispatch(updateTask(boardId, groupId, newTask))
        resetAttachment()
        toggleEdit()
    }

    if (!task) return <TrellisSpinner />
    return (
        <section className="attachments">
            <div className="attachment-header">
                <span className='icon-attachment'></span>
                <h3 className="inline-title">Attachments</h3>
            </div>
            <div className="attachment-main" >
                {isUploading && <TrellisSpinner />}
                {task.attachments && task.attachments.map(attachment => {
                    console.log('attach id in map', attachment);
                    return <div className="attachment-thumbnail" key={attachment.id}>

                        <div className="attachment-img-container">
                            <img key={attachment.id + 'im'} src={`${attachment.url}`} alt="new attachment" />
                        </div>
                        <div className="attachment-thumbnail-details">

                            <h5>{attachment.title ? attachment.title : 'Your Attachment'}</h5>
                            <div className="thumbnail-edit">
                                <span onClick={() => onRemoveAttachment(attachment.id)}>Delete</span>
                                <span> - </span>
                                <span onClick={() => toggleTitle(attachment.id)}>Edit</span>
                            </div>

                        </div>
                    </div>
                })}
                <TitleEdit cb={toggleEdit} onEditTitle={onEditTitle} isShown={isEdit} handleChange={handleChange} id={attachmentId} />

                <button onClick={() => toggleEdit()} className="btn-light" >Add an attachment</button>
            </div>
        </section>
    )
}

function TitleEdit({ isShown, cb, onEditTitle, handleChange, id }) {
    const [isTyping, setIsTyping] = useState(false)
    const pos = {
        left: '284px',
        top: '88px'
    }

    const onTyping = ev => {
        const { length } = ev.target.value
        if (length === 0) setIsTyping(false)
        else if (length > 0) setIsTyping(true)

    }
    console.log('this is the id in the title edit', id);
    if (!id) return <></>
    return (
        <div className={`pop-over ${isShown ? 'shown' : ''} `} style={pos}>
            <header className="pop-over-header flex">
                <h5 className="popover-title">Edit attachment</h5>
                <button className="pop-over-btn" onClick={() => cb()}>
                    <span>
                        <Close />
                    </span>

                </button>
            </header>
            <div className=" children-container">
                <form onSubmit={(ev) => onEditTitle(ev, id)} className=" title-edit flex-col" >
                    <label htmlFor="title">Link name</label>
                    <input
                        onChange={handleChange}
                        onInput={onTyping}
                        type="text"
                        name="title"
                        id="title"
                        autoFocus={true}
                    />
                    <input className={`btn btn${isTyping ? '-btn' : '-light'}`} type="submit" value="Update" />
                </form>
            </div>
        </div>
    )
}