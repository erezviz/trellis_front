
import * as React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
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

    return (

        <section style={modalStyle} className="task-details">
            <div className="details-container">

                {/* <div onClick={setIsEdit(!isEdit)}>
                <TaskTitle isFocus={isEdit}/>
            </div> */}
            <div className="details-header flex">

                <div contentEditable="true" className="details-title">
                    This is the Title
                </div>
                <button onClick={(ev) => props.onToggleDetails()} className="close-details-btn">X</button>
            </div>
                <section className="details-main-col">
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
        </section>
    )
}




