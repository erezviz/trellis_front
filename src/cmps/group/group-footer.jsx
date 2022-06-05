import { TextField } from "@mui/material"
import { React, useState } from "react"
import { ReactComponent as Close } from '../../assets/icon/close.svg'
import { useDispatch, useSelector } from "react-redux"
import { updateGroupTask } from "../../store/board.action"

import { ReactComponent as Plus } from '../../assets/icon/plus-icon.svg'

export const GroupFooter = (props) => {
    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState(true)
    const [task, setTask] = useState({ title: '' })
    const { currBoard } = useSelector(state => state.boardModule)


    const onHandleChange = ({ target }) => {
        setTask({ title: target.value })
    }

    const onSaveTask = (ev) => {
        ev.preventDefault()
        const boardId = props.boardId
        const groupId = props.groupId
        if (task.title === '') return
        dispatch(updateGroupTask(boardId, groupId, task))
        setIsShown(true)
    }

    const onToggle = () => {
        setIsShown(!isShown)
    }

    return (
        <section className="group-footer">
            {isShown && <div onClick={onToggle} className="add-task">
                <span className="plus-task">
                    <Plus />
                </span>
                <span className="plus-task-title">Add a card</span>
            </div>}
            {!isShown && <form onBlur={(ev) => onSaveTask(ev)} onSubmit={(ev) => onSaveTask(ev)}>
                <TextField required name="title" id="outlined-basic" onChange={onHandleChange}
                    size="small" placeholder="Enter a title for this card..." variant="outlined" />
                <div className="flex">
                    <button className='btn-save' >Add card</button>
                    <span className="btn-exit" onClick={onToggle}><Close /></span>
                </div>
            </form>}

        </section>
    )

}


