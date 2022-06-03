import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { utilService } from "../../services/util.service"
import { addBoard } from "../../store/board.action"
export const CreateBoardModal = ({ isShown }) => {
    const dispatch = useDispatch()
    const [isTyping, setIsTyping] = useState(false)
    const history = useHistory()
    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        style: {},
        groups: [{id: utilService.makeId(), title: '' }]

    })
    const onHandleChange = ev => {
        const { value, name } = ev.target
        setBoard(prevBoard => ({ ...prevBoard, [name]: value }))


    }


    const onAddBoard = ev => {
        ev.preventDefault()
        board.createdAt = Date.now()
        dispatch(addBoard(board))
            .then(res => history.push(`/board/${res.insertedId}`))
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
                    autoFocus={true}
                    onInput={onTyping}
                    onChange={onHandleChange}
                    type="text"
                    name="title"
                    id="title"
                    required
                />
                <div className="required-badge-container flex">
                    <span>👋</span>
                    <p>Board title is required</p>
                </div>
                <button className={`btn btn${isTyping ? '-blue' : '-light'}`}>Create</button>
            </form>
        </section>

    )

}