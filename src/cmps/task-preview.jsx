
export const TaskPreview = (props) => {
    const {task} = props
    // console.log('task',task)
   
    return (
        <section onClick={props.onOpenDetails} className="task-preview">
            <h5>{task.title}</h5>
        </section>
    )
}