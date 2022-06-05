

export const TaskTitle = (props) => {



    return (
        <section className="task-title">
            {!props.isFocus && <h2>Hello</h2>}
            {props.isFocus && <input type='text' value='Hello' />}
        </section>
    )
}
