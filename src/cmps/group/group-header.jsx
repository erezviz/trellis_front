

export const GroupHeader = (props) => {


    return(
        <section className="group-header">
            <h3 onClick={() => props.onChangeName()}>{props.title}</h3>
        </section>
    )
}