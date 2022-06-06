import { useState } from "react"


export const GroupHeader = (props) => {

    const [header, setHeader] = useState(props.title)
    let [isEdit, setIsEdit] = useState(false)
    

    const titleStyle = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '33px'
    }

    const handleFormChange = ev => {
        const { value } = ev.target
        setHeader(value)
        props.onChangeName(value)
    }
    

    return (
        <div onClick={() => setIsEdit(isEdit = !isEdit)} className="group-title flex">
            <form onSubmit={props.onSubmit}>
                <input 
                onBlur={props.onSubmit}
                style={isEdit ? { titleStyle } : {}} 
                value={props.groupTitle} 
                onChange={props.onHandleChange} 
                className="group-title" />
            </form>
        </div>
    )
}