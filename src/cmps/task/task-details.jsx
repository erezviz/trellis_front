
import * as React from 'react';
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { TaskTitle } from '../dynamic-cmps/task-title';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';




export const TaskDetails = (props) => {
    // const [isOpen, setIsOpen] = useState(true)
    let [isEdit, setIsEdit] = useState(false)
    let [title,setTitle] = useState({title: ''})
    let [task,setTask] = useState(null)
    let {taskId} = useParams()

    useEffect(() => {
       
    
      
    }, [])
    
    const modalStyle = {
        display: props.isOpen ? 'block' : 'none',
        position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',

        bgcolor: 'background.paper',
        // border: '2px solid #000',
        // boxShadow: 24,
        // pt: 2,
        // px: 4,
        // pb: 3,

    }
    const titleStyle = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '33px'
    }
    function onSave(ev) {
        ev.preventDefault()
     
    }

    const handleFormChange = ev => {
        const { name, value } = ev.target
        console.log(value);
        setTitle(prevTitle => ({ ...prevTitle, [name]: value }))
    }

    return (

        <section style={modalStyle} className="task-details">
            <div className="details-container flex">

                {/* <div onClick={setIsEdit(!isEdit)}>
                <TaskTitle isFocus={isEdit}/>
            </div> */}
                <button onClick={(ev) => props.onToggleDetails()} className="close-details-btn">X</button>
                <div onClick={() => setIsEdit(isEdit = !isEdit)} className="details-header flex">
                    <form onSubmit={(ev) => onSave(ev)} >
                            <textarea style={isEdit ? { titleStyle } : {}} onChange={handleFormChange} className="details-title" name="" id="" cols="30" rows="10" />
                        <input type="submit" value="Submit" />
                    </form>
                    {/* <div contentEditable="true" className="details-title">
                    This is the Title
                </div> */}
                </div>
                <div className="details-contents flex">
                    <section className="details-main-col flex">
                        <div className="details-desc">
                            <label htmlFor="description">Description</label>

                            <textarea
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                placeholder="Add a more detailed description..."
                            ></textarea>

                        </div>
                    </section>

                    <section className="details-sidebar">
                        <div className="main-add-actions">
                            <h3 className="sidebar-add-heading"> </h3>
                            <div>
                                Labels
                            </div>
                            <div>
                                Attachments
                            </div>
                            <div>
                                Checklist
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </section>
    )
}




