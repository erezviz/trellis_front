import { useState } from "react"
import {useDispatch} from "react-redux"
import { useHistory } from 'react-router-dom'
import { addBoard } from "../../store/board.action"
export const CreateBoardModal = ({ isShown }) => {
    const dispatch = useDispatch()
   const history = useHistory()
    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        style: {}

    })
    const onHandleChange = ev => {
        const { value, name } = ev.target
        setBoard(prevBoard => ({ ...prevBoard, [name]: value }))


    }

    const onAddBoard = async ev => {
        ev.preventDefault()
        board.createdAt = Date.now()
        const addedBoard = await dispatch(addBoard(board))
        history.push(`/board/${addedBoard._id}`)
        console.log('board in onadd', board); 

    }
    return (

        <section className="create-board-modal" style={{ display: `${isShown ? 'block' : 'none'}` }}>
            <form onSubmit={onAddBoard}  className="create-board-title flex">
                <label htmlFor="title">Board title<span>*</span></label>
                <input
                    onChange={onHandleChange}
                    type="text"
                    name="title"
                    id="title"
                    required
                />
                <button className="btn btn-blue">Create</button>
            </form>
        </section>

    )

}