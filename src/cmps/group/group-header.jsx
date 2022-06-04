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
        props.onChangeTitle(value)
    }


    return (
        <div onClick={() => setIsEdit(isEdit = !isEdit)} className="details-header group-title flex">
                    <form onBlur={(ev)=>{props.onSave(ev)}} onSubmit={(ev)=>{props.onSave(ev)}}>
                        <input style={isEdit ? { titleStyle } : {}} value={header} onChange={(ev)=>handleFormChange(ev)} className="details-title group-title" name="checklist"  />
                        {/* {isEdit && <button>Save</button>} */}
                    </form>
                </div>
    )

    // return(
    //     <section className="group-header">
    //         {/* {!props.isFocus && <h3>{props.title}</h3>} */}
    //         {/* {props.isFocus && <input type='text' value='Hello'/>} */}
    //         <h3 onClick={() => props.onChangeName()}>{props.title}</h3>
    //     </section>
    // )
}