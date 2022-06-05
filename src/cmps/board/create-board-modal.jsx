import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { utilService } from "../../services/util.service"
import { addBoard } from "../../store/board.action"
export const CreateBoardModal = ({ isShown }) => {
    const dispatch = useDispatch()
    const img1 = 'https://images.unsplash.com/photo-1638185220535-35e555a57d8c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzM5ODF8MHwxfHNlYXJjaHw2fHxmaXxlbnwwfDB8fHwxNjU0MjYyMzk3&ixlib=rb-1.2.1&q=80'
    const img2 = 'https://images.unsplash.com/photo-1608503071528-8b7dc9bc0c62?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzM5ODF8MHwxfHNlYXJjaHwxMHx8c2Z8ZW58MHwwfHx8MTY1NDI2Mjc0MA&ixlib=rb-1.2.1&q=80'
    const img3 = 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzM5ODF8MHwxfHNlYXJjaHw3fHxjb29sfGVufDB8MHx8fDE2NTQyNTk3MTI&ixlib=rb-1.2.1&q=80'
    const [isTyping, setIsTyping] = useState(false)
    const [imgChosen, setImgToChoose] = useState('img1')
    const history = useHistory()
    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        style: { imgUrl: img1 },
        groups: [{ id: utilService.makeId(), title: '' }]

    })

    // useEffect(()=>{
    //     console.log('coverImg changed!')
    // },[])

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

    const onChooseImg = (url, imgName) => {
        setImgToChoose(imgName)
        setBoard(prevBoard => ({ ...prevBoard, style: { imgUrl: url } }))
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
                <div className="flex">
                    <img onClick={() => onChooseImg(img1, 'img1')} className={`create-board-img img1${imgChosen}`} src={img1} alt="" />
                    <img onClick={() => onChooseImg(img2, 'img2')} className={`create-board-img img2${imgChosen}`} src={img2} alt="" />
                    <img onClick={() => onChooseImg(img3, 'img3')} className={`create-board-img img3${imgChosen}`} src={img3} alt="" />
                </div>
                <button className={`btn btn${isTyping ? '-blue' : '-light'}`}>Create</button>
            </form>
        </section>

    )

}