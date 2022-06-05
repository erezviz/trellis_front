import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { ReactComponent as Star } from '../../assets/icon/star.svg'


export const BoardHeader = (props) => {
    const { currBoard } = useSelector(state => state.boardModule)
    const [header, setHeader] = useState(currBoard.title)
    let [isEdit, setIsEdit] = useState(false)
    const [star, setStar] = useState('star')

    useEffect(() => {
        if (currBoard.starred) setStar('starred')
    })

    const titleStyle = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '33px'
    }

    const handleFormChange = ev => {
        const { value } = ev.target
        setHeader(value)
    }

    const onSaveChanges = () => {
        const board = JSON.parse(JSON.stringify(currBoard))
        board.title = header
        props.updateWholeBoard(board)
    }

    const onStar = () => {
        const board = JSON.parse(JSON.stringify(currBoard))
        board.starred = !board.starred
        if (star === 'star') setStar('starred')
        else setStar('star')
        props.updateWholeBoard(board)
    }

    if (!currBoard) return <></>
    return (
        <section onBlur={onSaveChanges} className="board-header flex">
            <div onClick={() => setIsEdit(isEdit = !isEdit)} className="board-title-section flex">
                <form>
                    <input style={isEdit ? { titleStyle } : {}} value={header} onChange={(ev) => handleFormChange(ev)} className="board-title" name="checklist" />
                </form>
            </div>
            <div className={`board-header-${star}`}>
                <Star onClick={onStar} />
            </div>
            <div className="board-members flex">
                {currBoard.members && currBoard.members.map(member => {
                    return <div key={member._id} className="board-member">
                        <img src={require(`../../assets/img/${member.imgUrl}`)} alt="" />
                    </div>
                })}
            </div>
        </section>
    )
}