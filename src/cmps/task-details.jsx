
import * as React from 'react';
import { useState } from 'react'
import { TaskTitle } from './dynamic-cmps/task-title';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';




export const TaskDetails = (props) => {
    // const [isOpen, setIsOpen] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const modalStyle = {
        display: props.isOpen ? 'block' : 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,

    }

    return (

        <section style={modalStyle} className="task-details">
            {/* <div onClick={setIsEdit(!isEdit)}>
                <TaskTitle isFocus={isEdit}/>
            </div> */}
            <button onClick={props.onOpenDetails} className="close-details-btn">X</button>
            <h3>This is the Title</h3>
            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder='Add a more detailed description...'
            ></textarea>


            <section className="details-side-bar">
                <div>
                    Labels
                </div>
                <div>
                    Attachments
                </div>
                <div>
                    Checklist
                </div>
            </section>

        </section>
    )
}




