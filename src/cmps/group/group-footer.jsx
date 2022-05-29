import { TextField } from "@mui/material"
import React, { useState } from "react"
import { boardService } from "../../services/board.service"
import { useDispatch, useSelector } from "react-redux"
import { updateGroupTask } from "../../store/board.action"


export const GroupFooter = (props) => {
    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState(true)
    var task = { title: '' }
    const { currBoard } = useSelector(state => state.boardModule)


    const onHandleChange = ({ target }) => {
        task = { title: target.value }
    }

    const onSaveTask = async (ev) => {
        ev.preventDefault()
        const boardId = props.boardId
        const groupId = props.groupId

        try{
            const updatedBoard = await dispatch(updateGroupTask(boardId, groupId, task))
            setIsShown(true)
        }catch(err){
            throw err
        }



    }



    const onToggle = () => {
        setIsShown(false)
    }





    return (
        <section className="group-footer">
            {isShown && <div onClick={onToggle} className="add-task">
                <span className="plus-task">+</span>
                <span>Add a card</span>
            </div>}
            {!isShown && <form onSubmit={(ev) => onSaveTask(ev)}>
                <TextField name="title" id="outlined-basic" onChange={onHandleChange} 
                    size="small" placeholder="Enter a title for this card..." variant="outlined" />
                <button className='btn-save'>+</button>
            </form>}

        </section>
    )

}


