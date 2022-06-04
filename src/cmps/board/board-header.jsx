import { useSelector } from "react-redux"
import { useState } from "react"
import { ReactComponent as Star } from '../assets/icon/star.svg'


export const BoardHeader = (props) => {
    const { currBoard } = useSelector(state => state.boardModule)
    const [header, setHeader] = useState(currBoard.title)
    let [isEdit, setIsEdit] = useState(false)


    const titleStyle = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '33px'
    }

    const handleFormChange = ev => {
        const { value, name } = ev.target
        setHeader(value)
    }

    const onSaveChanges=()=>{
        const board = JSON.parse(JSON.stringify(currBoard))
        board.title = header
        props.updateWholeBoard(board)
    }

    if (!currBoard) return <></>
    return (
        <section onBlur={onSaveChanges} className="board-header">
            <div onClick={() => setIsEdit(isEdit = !isEdit)} className="board-title-section flex">
                <form>
                    <input style={isEdit ? { titleStyle } : {}} value={header} onChange={(ev) => handleFormChange(ev)} className="board-title" name="checklist" />
                </form>
            </div>
            <div className="flex">
                <Star/>
                    </div>
        </section>
    )
}