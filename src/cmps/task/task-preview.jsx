import { Link } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"

export const TaskPreview = (props) => {
    const {task, idx} = props
    // console.log('task',idx)
   
    return (
        <Draggable key={task.id} draggableId={task.id} index={idx}>
            {(provided)=>{
        return <section {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
        onClick={() => props.onToggleDetails()} className="task-preview">
            <h5>{task.title}</h5>
            {provided.placeholder}
        </section>
        }}
        </Draggable>
    )
}