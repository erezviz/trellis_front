import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { uploadService } from "../../../services/upload.service"
import { utilService } from "../../../services/util.service"
import { updateTask } from "../../../store/board.action"
import { TrellisSpinner } from "../../util-cmps/trellis-spinner"

import {ReactComponent as Close} from '../../../assets/icon/close.svg'

export const CreateAttachment = ({ task, isShown, cb }) => {
    let { params: { boardId, groupId, taskId } } = useRouteMatch()
    const dispatch = useDispatch()
    const [isTyping, setIsTyping] = useState(false)
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

        setAttachment(emptyAttach)
    }

    const handleChange = ev => {
        ev.preventDefault()
        const { value, name } = ev.target
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

    const onSaveAttachment = ev => {
        ev.preventDefault()

        if (!attachment.title) {
            attachment.title = utilService.getFilename(attachment.url)

        }
        const newTask = utilService.getDeepCopy(task)
        attachment.id = utilService.makeId()
        // setAttachments(prevAttachments => ([...prevAttachments, attachment]))
        if (newTask.attachments) newTask.attachments = [...newTask.attachments, attachment]
        else newTask.attachments = [attachment]

        dispatch(updateTask(boardId, groupId, newTask))
        // toggleAdd()
        resetAttachment()

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
                    <form className="col" >
                        <label htmlFor="link">Attach a link</label>
                        <input
                            onChange={handleChange}
                            onInput={onTyping}
                            type="text"
                            name="url"
                            id="link"
                            autoFocus

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
                        <button className="btn-light">Attach</button>
                    </form>
                </section>
            </div>
        </div>
    )


}