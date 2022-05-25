import { Link } from "react-router-dom"
import { TaskPreview } from "./task-preview"


export const TaskList = (props) => {
    
    const {tasks} = props

    return(
        <section className="task-list">
            {(tasks || tasks.length)&& tasks.map(task=>{
              return  <TaskPreview task={task}/>
            })}
        </section>
    )
}