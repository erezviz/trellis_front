import { useSelector } from "react-redux"



export const BoardHeader = (props) => {
    const {currBoard} = useSelector(state => state.boardModule)
console.log(currBoard);
if(!currBoard)return <>Loading...</>
    return(
        <section className="board-header">
            <h1>{currBoard.title}</h1>

        </section>
    )
}