

export const TaskPreview = (props) => {
    const {task} = props
    // console.log('task',task)
   
    return (
        <section onClick={() => props.onOpenModal()} className="task-preview">
            <h5>{task.title}</h5>
        </section>
    )
}