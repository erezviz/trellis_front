import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { addBoard } from "../../store/board.action"
export const CreateBoardModal = ({ isShown }) => {
    const dispatch = useDispatch()
    const [isTyping, setIsTyping] = useState(false)
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

    }

    const onTyping = ev => {
        const { length } = ev.target.value
        if (length === 0) setIsTyping(false)
        else if (length > 0) setIsTyping(true)


    }
    return (

        <section className="create-board-modal" style={{ display: `${isShown ? 'block' : 'none'}` }}>
            <form onSubmit={onAddBoard} className="create-board-title flex">
                <label htmlFor="title">Board title<span>*</span></label>
                <input
                    onInput={onTyping}
                    onChange={onHandleChange}
                    type="text"
                    name="title"
                    id="title"
                    required
                />
                <button className={`btn btn${isTyping ? '-blue' : '-light'}`}>Create</button>
            </form>
        </section>

    )

}