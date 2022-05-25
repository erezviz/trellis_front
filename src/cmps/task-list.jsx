import { Link } from "react-router-dom"
import { TaskPreview } from "./task-preview"


export const TaskList = (props) => {

    return(
        <section className="task-list">
            <h3>I am a task list</h3>
            
                <TaskPreview/>
        </section>
    )
}