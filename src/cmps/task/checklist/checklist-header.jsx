import { useState } from "react"
import { utilService } from "../../../services/util.service";

export const ChecklistHeader = (props) => {
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
        props.onChangeTitle(value)
    }


    return (
        <div onClick={() => setIsEdit(isEdit = !isEdit)} className="details-header flex">
                    <form onBlur={(ev)=>{props.onSave(ev)}} onSubmit={(ev)=>{props.onSave(ev)}}>
                        <input style={isEdit ? { titleStyle } : {}} value={header} onChange={(ev)=>handleFormChange(ev)} className="details-title" name="checklist"  />
                        {/* {isEdit && <button>Save</button>} */}
                    </form>
                </div>
    )
}