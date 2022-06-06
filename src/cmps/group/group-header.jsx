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
<<<<<<< HEAD
            <form onSubmit={props.onSubmit}>
                <input 
                onBlur={props.onSubmit}
                style={isEdit ? { titleStyle } : {}} 
                value={props.groupTitle} 
                onChange={props.onHandleChange} 
                className="group-title" />
=======
            <form>
                <input
                    style={isEdit ? { titleStyle } : {}}
                    value={header}
                    onChange={(ev) => handleFormChange(ev)}
                    className="group-title"
                    name="checklist" />
>>>>>>> dacf6d033fa48e881642bcfd72b76d157c2929d9
            </form>
        </div>
    )
}