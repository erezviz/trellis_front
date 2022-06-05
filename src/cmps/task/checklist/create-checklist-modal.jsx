import { useState } from "react"

export const ChecklistModal = (props) => {
    const [title, setTitle] = useState('Checklist')

    const onChangeTitle=(ev)=>{
        const {value} = ev.target
        setTitle(value)
        console.log(value)
    }

    const onAddChecklist=()=>{
        props.onOpenChecklist(title)
        props.onClose()
        setTitle('Checklist')
    }

    return (
        <div className="flex">

        <input onChange={(ev)=>onChangeTitle(ev)} type="text" value={title}/>
        <button onClick={onAddChecklist} className='btn btn-blue'>Add</button>

        </div>
        )
}
