import { Link } from "react-router-dom"

export const TaskPreview = (props) => {
    const {task} = props
    // console.log('task',task)
   
    return (
        <Link to={`/board/${props.boardId}/${task.id}`}><section onClick={() => props.onToggleDetails()} className="task-preview">
            <h5>{task.title}</h5>
        </section></Link>
    )
}