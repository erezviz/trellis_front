import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { uploadService } from "../../../services/upload.service"
import { utilService } from "../../../services/util.service"
import { updateTask } from "../../../store/board.action"
import { TrellisSpinner } from "../../util-cmps/trellis-spinner"

import { ReactComponent as Close } from '../../../assets/icon/close.svg'

export const CreateAttachment = ({ task, isShown, cb }) => {
    let { params: { boardId, groupId } } = useRouteMatch()
    const dispatch = useDispatch()
    const hiddenFileInput = useRef(null)
    const [isTyping, setIsTyping] = useState(false)
    let [isUploading, setIsUploading] = useState(false)
    let [attachment, setAttachment] = useState({
        title: '',
        createdAt: Date.now(),
        url: ''
    })

    const resetAttachment = () => {
        const emptyAttach = {
            title: '',
            createdAt: Date.now(),
            url: ''
        }

        setAttachment(prevAttachment => prevAttachment = emptyAttach)
    }


    const handleChange = ev => {
        ev.preventDefault()
        const { value, name } = ev.target
        setAttachment(prevAttachment => ({ ...prevAttachment, [name]: value }))

    }
    useEffect(() => {
        if (attachment.url && isUploading) onSaveAttachment()


    }, [attachment])

    const handleUploadClick = ev => {
        hiddenFileInput.current.click()
    }

    const uploadImg = async (ev) => {

        if (!ev.target.files[0] || !ev.target.files.length) return
        const title = utilService.getFilename(ev.target.value)
        // setIsUploading(prevUploading => prevUploading = true)
        const url = await uploadService.uploadImg(ev)
        setIsUploading(true)

        setAttachment(prevAttachment => ({ ...prevAttachment, url, title }))


    }

    const onSaveAttachment = ev => {
        if (ev) ev.preventDefault()
        const newAttachment = utilService.getDeepCopy(attachment)

        if (attachment.title.includes('\\fakepath\\')) {
            newAttachment.title = utilService.getFilename(attachment.url)
        }
        const newTask = utilService.getDeepCopy(task)
        newAttachment.id = utilService.makeId()

        if (newTask.attachments) newTask.attachments = [...newTask.attachments, newAttachment]
        else newTask.attachments = [newAttachment]


        dispatch(updateTask(boardId, groupId, newTask))
        resetAttachment()
        cb()
    }

    const onTyping = ev => {
        const { length } = ev.target.value
        if (length === 0) setIsTyping(false)
        else if (length > 0) setIsTyping(true)


    }
    const pos = {
        left: "433px",
        top: "285px"
    }
    if (!task) return <TrellisSpinner />

    return (

        <div className={`pop-over ${isShown ? 'shown' : ''} `} style={pos}>
            <header className="pop-over-header flex">
                <h5 className="popover-title">Attach from...</h5>
                <button className="pop-over-btn" onClick={() => cb()}>
                    <span>
                        <Close />
                    </span>

                </button>
            </header>
            <div className="children-container">
                <section className="create-attachment">

                    <button className="upload-btn" onClick={handleUploadClick} >Computer</button>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={uploadImg}
                        tabIndex="-1"
                        id="imgUpload"
                        style={{ display: 'none' }}
                        accept="image/*"
                    />

                    <form onSubmit={onSaveAttachment} className="col" >
                        <label htmlFor="link">Attach a link</label>
                        <input
                            onChange={handleChange}
                            onInput={onTyping}
                            type="text"
                            name="url"
                            id="link"
                            placeholder="Paste any link here..."
                            autoFocus
                            value={attachment.url}

                        />
                        {isTyping &&
                            <>
                                <label htmlFor="title">{'Link name (optional)'}</label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="title"
                                    name="title"
                                />
                            </>
                        }
                        <input type="submit" value="Attach" />
                    </form>
                </section>
            </div>
        </div>
    )


}