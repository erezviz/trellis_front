

export const TaskPreview = (props) => {

    return (
        <section onClick={() => props.onOpenModal()} className="task-preview">
            <h5>this is a task preview</h5>
        </section>
    )
}