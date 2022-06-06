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
        const { value, name } = ev.target
        setHeader(value)
        props.onChangeName(value)
    }


    return (
        <div onClick={() => setIsEdit(isEdit = !isEdit)} className="group-title flex">
            <form>
                <input
                    style={isEdit ? { titleStyle } : {}}
                    value={header}
                    onChange={(ev) => handleFormChange(ev)}
                    className="group-title"
                    name="checklist" />
            </form>
        </div>
    )
}