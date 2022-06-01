import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { boardService } from "../../services/board.service"
import { uploadService } from "../../services/upload.service"
import { utilService } from "../../services/util.service"
import { updateTask } from "../../store/board.action"
import { TrellisSpinner } from "../util-cmps/trellis-spinner"

export const Attachments = ({ task }) => {
    let { params: { boardId, groupId, taskId } } = useRouteMatch()
    const dispatch = useDispatch()
    let [isAdd, setIsAdd] = useState(false)
    let [isAdded, setIsAdded] = useState(false)
    let [attachments, setAttachments] = useState([])
    let [isUploading, setIsUploading] = useState(false)
    let [attachment, setAttachment] = useState({
        title: null,
        createdAt: Date.now(),
        url: null
    })
    window.t = attachment
    const resetAttachment = () => {
        const emptyAttach = {
            title: null,
            createdAt: Date.now(),
            url: null
        }
        console.log('resetting attachment...');
        setAttachment(emptyAttach)
    }

    const handleChange = ev => {
        ev.preventDefault()
        const { value, name, id } = ev.target
        // const attachment = boardService.createAttachment(id, value)
        setAttachment(prevAttachment => ({ ...prevAttachment, [name]: value }))

    }

    const uploadImg = async (ev) => {
        if (!ev.target.files[0] || !ev.target.files.length) return
        attachment.title = utilService.getFilename(ev.target.value)
        setIsUploading(prevUploading => prevUploading = true)
        const url = await uploadService.uploadImg(ev)
        setIsUploading(prevUploading => prevUploading = false)

        setAttachment(prevAttachment => ({ ...prevAttachment, url }))
    }
    const toggleAdd = () => {
        setIsAdd(prevIsAdd => prevIsAdd = !isAdd)
    }

    const onSaveAttachment  = ev => {
        ev.preventDefault()
        console.log('attachment in onSaveAttachment', attachment);

        if (!attachment.title) {
            attachment.title = utilService.getFilename(attachment.url)

        }
        const newTask = utilService.getDeepCopy(task)
        attachment.id = utilService.makeId()
        console.log('attachment.id in on save', attachment.id);
        // setAttachments(prevAttachments => ([...prevAttachments, attachment]))
        if (newTask.attachments) newTask.attachments = [...newTask.attachments, attachment]
        else newTask.attachments = [attachment]

        console.log('attachment in onSaveAttachment before dispatch', attachment);
        dispatch(updateTask(boardId, groupId, newTask))
        toggleAdd()
        resetAttachment()

    }

    const onRemoveAttachment = (attachmentId) => {
        console.log('attach id in onremove', attachmentId);
        const newTask = utilService.getDeepCopy(task)
        const newAttachments = newTask.attachments.filter(attachment => attachment.id !== attachmentId)
        console.log('newAttachments in onRemove', newAttachments);
        newTask.attachments = newAttachments
        dispatch(updateTask(boardId, groupId, newTask))

    }

    const onEditTitle = (attachId) => {

        //TODO  Change prompt to a nice modal -- preferably something dynamic you can use again and again
        const newTitle = prompt('Edit attachment', 'Link name')
       
        const newTask = utilService.getDeepCopy(task)
        console.log('the newTask in editTitle', newTask);
        if (!newTitle) return
        const newAttachments = newTask.attachments.map(attachment => {
            if (attachment.id === attachId) attachment.title = newTitle
            return attachment
        })
        newTask.attachments = newAttachments
        console.log('the newTask after adding new attachments', newTask);
    
        dispatch(updateTask(boardId, groupId, newTask))
    }

    console.log('attachment before return', attachment);
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
                    return <div className="attachment-thumbnail" key={attachment.id}>

                        <div className="attachment-img-container">
                            <img key={attachment.id + 'im'} src={`${attachment.url}`} alt="new attachment" />
                        </div>
                        <div className="attachment-thumbnail-details">

                            <h5>{attachment.title ? attachment.title : 'Your Attachment'}</h5>
                            <button onClick={() => onRemoveAttachment(attachment.id)} className="  btn-danger">Delete</button>
                            <button onClick={() => onEditTitle(attachment.id)} className="btn-blue">Edit</button>

                        </div>
                    </div>
                })}

                <button onClick={() => toggleAdd()} className="btn-light" >Add an attachment</button>
                {isAdd && <div className="attachment-form-container">
                    <form className="link-form" onSubmit={onSaveAttachment} >
                        <label htmlFor="link">Add a link</label>
                        <input type="text" id="url" name="url" placeholder="Add a link here" onChange={handleChange} />
                        <input className="btn-light" type="submit" value="Submit" />
                    </form >
                    <form className="link-form" onSubmit={onSaveAttachment}>
                        <label htmlFor="file">Add a file</label>
                        <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
                        <input className="btn-light" type="submit" value="Submit" />
                    </form>
                </div>}
                {/* <input type="file" name="file" tabindex="-1" multiple="multiple"/> */}

            </div>

        </section>
    )
}