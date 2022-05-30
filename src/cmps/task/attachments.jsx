import { useEffect, useState } from "react"
import { boardService } from "../../services/board.service"
import { uploadService } from "../../services/upload.service"
import { utilService } from "../../services/util.service"
import { TrellisSpinner } from "../util-cmps/trellis-spinner"

export const Attachments = (props) => {
    let [isAdd, setIsAdd] = useState(false)
    let [isAdded, setIsAdded] = useState(false)
    let [attachments, setAttachments] = useState([])
    let [isUploading, setIsUploading] = useState(false)
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
        setAttachment(prevAttachment => ({...prevAttachment, emptyAttach}))
    }

    const handleChange = ev => {
        ev.preventDefault()
        const { value, name, id } = ev.target
        // const attachment = boardService.createAttachment(id, value)
        setAttachment(prevAttachment => ({ ...prevAttachment, [name]: value }))

    }
    const uploadImg = async (ev) => {
        if(!ev.target.files[0] || !ev.target.files.length) return
        attachment.title = utilService.getFilename(ev.target.value)
        setIsUploading(prevUploading => prevUploading = true)
        const url = await uploadService.uploadImg(ev)
        setIsUploading(prevUploading => prevUploading = false)

        setAttachment(prevAttachment => ({ ...prevAttachment, url }))
    }

    const onSaveAttachment = ev => {
        ev.preventDefault()
        setIsAdd(prevIsAdd => prevIsAdd = false)
        if (!attachment.title) attachment.title = utilService.getFilename(attachment.url)
        attachment.id = utilService.makeId()
        setAttachments(prevAttachments => ([...prevAttachments, attachment]))
        resetAttachment()

    }

    const onRemoveAttachment = (attachmentId) => {
        const newAttachments = attachments.filter(attachment => attachment.id !== attachmentId)

        setAttachments(prevAttachments => prevAttachments = newAttachments)



    }

    const onOpenEdit = (attachId) => {
        //TODO  Change prompt to a nice modal -- preferably something dynamic you can use again and again
        const newTitle = prompt('Edit attachment', 'Link name')
        const newAttachments = attachments.map(attachment => {
            if (attachment.id === attachId) attachment.title = newTitle
            return attachment
        })
        setAttachments(prevAttachments => prevAttachments = newAttachments)


    }


    return (
        <section className="attachments">
            <div className="attachment-header">
                <span className='icon-attachment'></span>
                <h3 className="inline-title">Attachments</h3>

            </div>
            <div className="attachment-main" >
                {isUploading && <TrellisSpinner />}
                {(attachments || attachments.length > 0 || !isUploading) && attachments.map(attachment => {
                    return <div className="attachment-thumbnail" key={attachment.id}>

                        <div className="attachment-img-container">
                            <img key={attachment.id + 'im'} src={`${attachment.url}`} alt="new attachment" />
                        </div>
                        <div className="attachment-thumbnail-details">
                            <h5>{attachment.title ? attachment.title : 'Your Attachment'}</h5>
                            <button onClick={() => onRemoveAttachment(attachment.id)} className="  btn-danger">Delete</button>
                            <button onClick={() => onOpenEdit(attachment.id)} className="btn-blue">Edit</button>

                        </div>
                    </div>
                })}

                <button onClick={() => setIsAdd(isAdd = !isAdd)} className="btn-light" >Add an attachment</button>
                {isAdd &&
                    <form onSubmit={onSaveAttachment} >
                        <label htmlFor="link">Add a link</label>
                        <input type="text" id="link" name="link" placeholder="Add a link here" onChange={handleChange} />
                        <label htmlFor="file">Add a file</label>
                        <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
                        <input className="btn-light" type="submit" value="Submit" />
                    </form>}
                {/* <input type="file" name="file" tabindex="-1" multiple="multiple"/> */}

            </div>

        </section>
    )
}