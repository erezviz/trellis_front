import { Link } from "react-router-dom"
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min"
import { TaskPreview } from "./task-preview"


export const TaskList = (props) => {

    const { tasks } = props



    if (!tasks) return (<p>No tasks</p>)
    return (
        <section className="task-list">
            {(tasks || tasks.length) && tasks.map((task, idx) => {

                return (

                    
                        <Link key={task.id + idx} to={`/board/${props.boardId}/${props.groupId}/${task.id}`}>
                            <TaskPreview boardId={props.boardId} onToggleDetails={props.onToggleDetails} key={task.id} task={task} />
                        </Link>

                   
                )
            })}
        </section>
    )
}