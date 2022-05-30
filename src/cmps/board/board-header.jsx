import { useSelector } from "react-redux"



export const BoardHeader = (props) => {
    const {currBoard} = useSelector(state => state.boardModule)
if(!currBoard)return <></>
    return(
        <section className="board-header">
            <h1>{currBoard.title}</h1>

        </section>
    )
}