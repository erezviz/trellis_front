import { Link } from "react-router-dom"
import { TaskPreview } from "./task-preview"


export const TaskList = (props) => {
    
    const {tasks} = props
    // console.log(tasks)
    
 
    if (!tasks) return(<p>No tasks</p>)
    return(
        <section className="task-list">
            {(tasks || tasks.length)&& tasks.map(task=>{
              return  <TaskPreview onToggleDetails={props.onToggleDetails} key={task.id} task={task}/>
            })}
        </section>
    )
}